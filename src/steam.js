const axios = require('axios');
const players = require('../config/players.json');

const CS2_APPID = 730;
const STEAMID64_RE = /^\d{17}$/;

function isPrivateOrTransientError(err) {
  const status = err.response?.status;
  return status === 403 || status === 400 || status === 500;
}

async function resolveToSteamId64(input) {
  if (STEAMID64_RE.test(input)) return input;

  const apiKey = process.env.STEAM_API_KEY;
  const { data } = await axios.get('https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/', {
    params: { key: apiKey, vanityurl: input },
    timeout: 10000,
  });
  if (data.response?.success === 1) return data.response.steamid;
  throw new Error(`No encontré un perfil de Steam para "${input}"`);
}

async function resolvePlayerInput(aliasOrNameOrId) {
  const key = aliasOrNameOrId.toLowerCase();
  const configured = players[key];
  return resolveToSteamId64(configured || aliasOrNameOrId);
}

async function getPlayerStats(steamid64) {
  const apiKey = process.env.STEAM_API_KEY;

  const [summaryRes, statsRes] = await Promise.all([
    axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/', {
      params: { key: apiKey, steamids: steamid64 },
      timeout: 10000,
    }),
    axios.get('https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/', {
      params: { key: apiKey, steamid: steamid64, appid: CS2_APPID },
      timeout: 10000,
    }).catch((err) => {
      if (isPrivateOrTransientError(err)) return null;
      throw err;
    }),
  ]);

  const personaName = summaryRes.data.response?.players?.[0]?.personaname || steamid64;
  if (!statsRes) return { personaName, isPrivate: true };

  const statsList = statsRes.data.playerstats?.stats || [];
  const statsMap = Object.fromEntries(statsList.map((s) => [s.name, s.value]));
  const kills = statsMap.total_kills || 0;
  const deaths = statsMap.total_deaths || 0;
  const wins = statsMap.total_wins || 0;
  const matches = statsMap.total_matches_played || statsMap.total_rounds_played || 0;
  const kd = deaths > 0 ? (kills / deaths).toFixed(2) : kills.toFixed(2);

  return { personaName, isPrivate: false, kills, deaths, wins, matches, kd };
}

const PERSONA_STATES = {
  0: 'desconectado', 1: 'en línea', 2: 'ocupado', 3: 'ausente',
  4: 'inactivo', 5: 'buscando intercambio', 6: 'buscando partida',
};

async function getAllPlayerPresence() {
  const aliases = Object.keys(players);
  if (aliases.length === 0) return [];

  const resolved = await Promise.all(aliases.map(async (alias) => {
    try {
      return { alias, steamid64: await resolvePlayerInput(alias) };
    } catch (err) {
      return { alias, steamid64: null };
    }
  }));

  const validIds = resolved.filter((r) => r.steamid64).map((r) => r.steamid64);
  if (validIds.length === 0) return [];

  const apiKey = process.env.STEAM_API_KEY;
  const { data } = await axios.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/', {
    params: { key: apiKey, steamids: validIds.join(',') },
    timeout: 10000,
  });
  const bySteamId = Object.fromEntries((data.response?.players || []).map((p) => [p.steamid, p]));

  return resolved
    .filter((r) => r.steamid64 && bySteamId[r.steamid64])
    .map((r) => {
      const p = bySteamId[r.steamid64];
      return {
        alias: r.alias,
        personaName: p.personaname,
        stateText: PERSONA_STATES[p.personastate] || 'desconocido',
        online: p.personastate !== 0,
        playingCS2: p.gameid === String(CS2_APPID),
      };
    });
}

async function getOnlineReport() {
  const presence = await getAllPlayerPresence();
  if (presence.length === 0) return 'No pude revisar el estado de nadie ahora mismo.';

  const lines = presence.map((p) => {
    const status = p.playingCS2 ? 'jugando CS2 🔫' : p.stateText;
    return `${p.alias}: ${status}`;
  });
  return `Estado del grupo:\n${lines.join('\n')}`;
}

async function getRanking() {
  const aliases = Object.keys(players);
  if (aliases.length === 0) {
    return 'Todavía no hay jugadores configurados. Agrégalos en config/players.json.';
  }

  const results = await Promise.all(aliases.map(async (alias) => {
    try {
      const steamid64 = await resolvePlayerInput(alias);
      const stats = await getPlayerStats(steamid64);
      return { alias, ...stats };
    } catch (err) {
      return { alias, error: true };
    }
  }));

  const ranked = results
    .filter((r) => !r.error && !r.isPrivate)
    .sort((a, b) => parseFloat(b.kd) - parseFloat(a.kd));

  if (ranked.length === 0) return 'No pude obtener stats de nadie (perfiles privados o error).';

  const lines = ranked.map((r, i) => `${i + 1}. ${r.alias} — K/D ${r.kd} (${r.kills}K/${r.deaths}D)`);
  return `Ranking CS2 por K/D:\n${lines.join('\n')}`;
}

module.exports = { resolvePlayerInput, getPlayerStats, getRanking, getAllPlayerPresence, getOnlineReport };
