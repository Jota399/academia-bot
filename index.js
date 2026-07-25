require('dotenv').config({ quiet: true });
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const qrcodePng = require('qrcode');
const path = require('path');
const cron = require('node-cron');

const { getWeatherReport } = require('./src/weather');
const { getRandomJoke } = require('./src/jokes');
const { askLLM } = require('./src/llm');
const { resolvePlayerInput, getPlayerStats, getRanking, getAllPlayerPresence, getOnlineReport } = require('./src/steam');
const { pickRandomMap, flipCoin, splitTeams } = require('./src/games');
const { getWeatherForMentionedCities } = require('./src/cityMentions');
const { linkMember, getAliasForAuthor } = require('./src/members');
const { checkRateLimit } = require('./src/rateLimit');
const players = require('./config/players.json');

const GROUP_ID = process.env.WHATSAPP_GROUP_ID;
const BOT_LID = process.env.WHATSAPP_BOT_LID;
const OWNER_ID = process.env.OWNER_ID;

function isOwner(message) {
  return Boolean(OWNER_ID) && message.author === OWNER_ID;
}

process.on('unhandledRejection', (err) => {
  console.error('[unhandledRejection]', err);
});

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: true },
});

client.on('qr', (qr) => {
  console.log('Escanea este QR con el WhatsApp del bot (Dispositivos vinculados):');
  qrcode.generate(qr, { small: true });
  const outPath = path.join(__dirname, 'qr.png');
  qrcodePng.toFile(outPath, qr, { width: 500 }, (err) => {
    if (err) console.error('[qr png error]', err);
    else console.log('QR guardado como imagen en', outPath);
  });
});

client.on('ready', () => {
  console.log('Bot listo. Mi ID:', client.info.wid._serialized);
  scheduleDailyJobs();
  schedulePresenceWatch();
});

const HELP_TEXT = `Mencióname (@Jsauer) junto con el comando. Comandos disponibles:
!clima - clima de hoy
!chiste - un chiste random
!stats <alias-o-steamid> - stats de CS2
!ranking - ranking del grupo por K/D
!mejorar <alias> - tips de mejora para ese jugador
!vs <alias1> <alias2> - compara stats de dos jugadores
!online - quién del grupo está conectado o jugando CS2
!equipos <nombre1> <nombre2> ... - arma 2 equipos al azar
!mapa - tira un mapa random del pool activo
!moneda - cara o sello
!todos - avisa al grupo que alguien quiere jugar
!soyyo <alias> - te ancla ese alias, para usar !stats/!mejorar sin escribirlo cada vez
!pregunta <texto> - preguntale algo al bot
También puedes mencionarme (@) con cualquier pregunta.`;

async function handleCommand(message, text) {
  const [cmd, ...rest] = text.trim().split(/\s+/);
  const arg = rest.join(' ');

  switch (cmd.toLowerCase()) {
    case '!help':
      return message.reply(HELP_TEXT);

    case '!clima':
      return message.reply(await getWeatherReport());

    case '!chiste':
      return message.reply(getRandomJoke());

    case '!pregunta': {
      if (!isOwner(message)) return message.reply('Ese comando es solo para Jonathan.');
      if (!arg) return message.reply('Usa: !pregunta <tu pregunta>');
      const rl = checkRateLimit(message.author);
      if (!rl.allowed) return message.reply(`Che, tranquilo con las preguntas. Probá de nuevo en ${rl.retryAfterSeconds}s.`);
      return message.reply(await askLLM(arg));
    }

    case '!soyyo': {
      if (!arg) return message.reply('Usa: !soyyo <alias> (ej: !soyyo dark)');
      const aliasKey = arg.trim().toLowerCase();
      if (!players[aliasKey]) {
        return message.reply(`No conozco el alias "${arg}". Alias válidos: ${Object.keys(players).join(', ')}`);
      }
      linkMember(message.author, aliasKey);
      return message.reply(`Listo, te ancló como "${aliasKey}" 🔗. Ahora puedes usar !stats o !mejorar sin escribir el alias.`);
    }

    case '!stats': {
      let target = arg;
      if (!target) {
        target = getAliasForAuthor(message.author);
        if (!target) return message.reply('No tengo tu alias anclado. Usa "!soyyo <alias>" primero, o "!stats <alias>".');
      }
      try {
        const steamid64 = await resolvePlayerInput(target);
        const stats = await getPlayerStats(steamid64);
        if (stats.isPrivate) return message.reply(`${stats.personaName}: perfil privado, no puedo ver sus stats.`);
        return message.reply(
          `${stats.personaName}: K/D ${stats.kd} (${stats.kills} kills / ${stats.deaths} deaths), ${stats.wins} victorias`,
        );
      } catch (err) {
        return message.reply(err.message || 'No pude obtener esas stats.');
      }
    }

    case '!ranking':
      return message.reply(await getRanking());

    case '!mejorar': {
      if (!isOwner(message)) return message.reply('Ese comando es solo para Jonathan.');
      let target = arg;
      if (!target) {
        target = getAliasForAuthor(message.author);
        if (!target) return message.reply('No tengo tu alias anclado. Usa "!soyyo <alias>" primero, o "!mejorar <alias>".');
      }
      try {
        const steamid64 = await resolvePlayerInput(target);
        const stats = await getPlayerStats(steamid64);
        if (stats.isPrivate) return message.reply(`${stats.personaName}: perfil privado, no puedo darte tips basados en stats.`);
        const rl = checkRateLimit(message.author);
        if (!rl.allowed) return message.reply(`Che, tranquilo con las preguntas. Probá de nuevo en ${rl.retryAfterSeconds}s.`);
        const prompt = `Dame 2-3 tips cortos y concretos para mejorar en CS2 para un jugador con K/D ${stats.kd} (${stats.kills} kills, ${stats.deaths} deaths, ${stats.wins} victorias). Sé directo, sin relleno.`;
        return message.reply(await askLLM(prompt));
      } catch (err) {
        return message.reply(err.message || 'No pude generar tips para ese jugador.');
      }
    }

    case '!vs': {
      const [alias1, alias2] = rest;
      if (!alias1 || !alias2) return message.reply('Usa: !vs <alias1> <alias2>');
      try {
        const [id1, id2] = await Promise.all([resolvePlayerInput(alias1), resolvePlayerInput(alias2)]);
        const [stats1, stats2] = await Promise.all([getPlayerStats(id1), getPlayerStats(id2)]);
        if (stats1.isPrivate || stats2.isPrivate) {
          return message.reply('Uno de los dos perfiles es privado, no puedo compararlos.');
        }
        return message.reply(
          `${stats1.personaName}: K/D ${stats1.kd} (${stats1.kills}K/${stats1.deaths}D)\n`
          + `${stats2.personaName}: K/D ${stats2.kd} (${stats2.kills}K/${stats2.deaths}D)\n`
          + `Gana: ${parseFloat(stats1.kd) >= parseFloat(stats2.kd) ? stats1.personaName : stats2.personaName}`,
        );
      } catch (err) {
        return message.reply(err.message || 'No pude comparar esos jugadores.');
      }
    }

    case '!online':
      return message.reply(await getOnlineReport());

    case '!equipos': {
      if (rest.length < 2) return message.reply('Usa: !equipos <nombre1> <nombre2> ... (mínimo 2 nombres)');
      const { teamA, teamB } = splitTeams(rest);
      return message.reply(`Equipo A: ${teamA.join(', ')}\nEquipo B: ${teamB.join(', ')}`);
    }

    case '!mapa':
      return message.reply(`Mapa: ${pickRandomMap()}`);

    case '!moneda':
      return message.reply(flipCoin());

    case '!todos':
      return message.reply('🔔 ¡Aviso para todos! Alguien quiere jugar CS2 — a ver quién se prende.');

    default:
      return null;
  }
}

client.on('message', async (message) => {
  try {
    // No usar message.getChat() / client.getChatById() aquí: rompió el proceso completo
    // contra una actualización reciente de WhatsApp Web. Chequear el JID directo basta.
    const isGroup = message.from.endsWith('@g.us');
    if (!isGroup || message.from !== GROUP_ID) return;

    // El bot solo responde si: lo etiquetan (@Jsauer), escriben "Jsauer" en el texto,
    // o responden (reply) citando un mensaje del propio bot.
    const bodyText = message.body || '';
    const mentionedIds = message.mentionedIds || [];
    const botId = client.info.wid._serialized;
    const isTagged = mentionedIds.includes(botId) || (BOT_LID && mentionedIds.includes(BOT_LID));
    const isNamedMention = /\bjsauer\b/i.test(bodyText);
    const quotedParticipant = message._data?.quotedParticipant;
    const quotedFromMe = message.hasQuotedMsg
      && (quotedParticipant === botId || (BOT_LID && quotedParticipant === BOT_LID));
    if (!isTagged && !isNamedMention && !quotedFromMe) return;

    const text = bodyText.replace(/@\d+/g, '').replace(/\bjsauer\b/gi, '').trim();

    if (text.startsWith('!')) {
      await handleCommand(message, text);
      return;
    }

    if (!text) {
      await message.reply('Soy Jsauer 🤖 Pregúntame lo que sea, y si mencionas una ciudad te digo el clima.');
      return;
    }

    const cityWeatherLines = await getWeatherForMentionedCities(text);
    if (cityWeatherLines.length > 0) {
      await message.reply(cityWeatherLines.join('\n'));
      return;
    }

    const rl = checkRateLimit(message.author);
    if (!rl.allowed) {
      await message.reply(`Che, tranquilo con las preguntas. Probá de nuevo en ${rl.retryAfterSeconds}s.`);
      return;
    }

    await message.reply(await askLLM(text));
  } catch (err) {
    console.error('[message handler error]', err);
  }
});

function scheduleDailyJobs() {
  // Hora local del sistema donde corre el bot.
  cron.schedule('0 8 * * *', async () => {
    try {
      await client.sendMessage(GROUP_ID, await getWeatherReport());
    } catch (err) {
      console.error('[cron clima error]', err);
    }
  });

  cron.schedule('0 9 * * *', async () => {
    try {
      await client.sendMessage(GROUP_ID, getRandomJoke());
    } catch (err) {
      console.error('[cron chiste error]', err);
    }
  });

  cron.schedule('0 10 * * *', async () => {
    try {
      await client.sendMessage(GROUP_ID, await getRanking());
    } catch (err) {
      console.error('[cron ranking error]', err);
    }
  });

  console.log('Horarios diarios programados: 8am clima, 9am chiste, 10am ranking.');
}

const lastKnownPlayingCS2 = new Map();

async function schedulePresenceWatch() {
  // Al arrancar (o reiniciar) el bot, tomamos nota del estado actual sin avisar nada.
  // Si no hacemos esto, el primer chequeo después de un reinicio cree que todos
  // "acaban de entrar" o "se desconectaron" solo porque el mapa se vació en memoria.
  try {
    const initialPresence = await getAllPlayerPresence();
    for (const p of initialPresence) {
      lastKnownPlayingCS2.set(p.alias, p.playingCS2);
    }
  } catch (err) {
    console.error('[presence watch init error]', err);
  }

  cron.schedule('*/3 * * * *', async () => {
    try {
      const presence = await getAllPlayerPresence();
      for (const p of presence) {
        const wasPlaying = lastKnownPlayingCS2.get(p.alias) || false;
        if (p.playingCS2 && !wasPlaying) {
          await client.sendMessage(GROUP_ID, `🔫 ${p.alias} (${p.personaName}) acaba de entrar a jugar CS2!`);
        } else if (!p.playingCS2 && wasPlaying) {
          await client.sendMessage(GROUP_ID, `👋 ${p.alias} (${p.personaName}) se desconectó de CS2.`);
        }
        lastKnownPlayingCS2.set(p.alias, p.playingCS2);
      }
    } catch (err) {
      console.error('[presence watch error]', err);
    }
  });
  console.log('Monitoreo de presencia CS2 activado (cada 3 min).');
}

client.initialize();
