const ACTIVE_DUTY_MAPS = ['Dust2', 'Mirage', 'Inferno', 'Nuke', 'Overpass', 'Ancient', 'Anubis'];

function pickRandomMap() {
  return ACTIVE_DUTY_MAPS[Math.floor(Math.random() * ACTIVE_DUTY_MAPS.length)];
}

function flipCoin() {
  return Math.random() < 0.5 ? 'Cara' : 'Sello';
}

function splitTeams(names) {
  const shuffled = [...names].sort(() => Math.random() - 0.5);
  const mid = Math.ceil(shuffled.length / 2);
  return { teamA: shuffled.slice(0, mid), teamB: shuffled.slice(mid) };
}

module.exports = { pickRandomMap, flipCoin, splitTeams };
