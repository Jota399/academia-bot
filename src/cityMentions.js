const { getWeatherForCity } = require('./weather');

const STOPWORDS = new Set([
  'jsauer', 'hola', 'como', 'cómo', 'que', 'qué', 'cual', 'cuál', 'donde', 'dónde',
  'cuando', 'cuándo', 'porque', 'por', 'bot', 'oye', 'ey', 'buenas', 'buenos',
  'gracias', 'porfa', 'porfavor', 'ok', 'dale', 'este', 'esta', 'estos', 'estas',
]);

function extractCityCandidates(text) {
  const matches = text.match(/(?:[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ]*(?:\s+(?:de|del|la|las|los)\s+[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ]*)*(?:\s+[A-ZÁÉÍÓÚÑ][\wÁÉÍÓÚÑáéíóúñ]*)*)/g) || [];
  const seen = new Set();
  const candidates = [];
  for (const raw of matches) {
    const candidate = raw.trim();
    const key = candidate.toLowerCase();
    if (!candidate || seen.has(key) || STOPWORDS.has(key)) continue;
    seen.add(key);
    candidates.push(candidate);
  }
  return candidates.slice(0, 3);
}

async function getWeatherForMentionedCities(text) {
  const candidates = extractCityCandidates(text);
  const results = [];
  for (const candidate of candidates) {
    if (results.length >= 2) break;
    try {
      const line = await getWeatherForCity(candidate);
      if (line) results.push(line);
    } catch (err) {
      // ignorar candidatos que no resuelven a una ciudad real
    }
  }
  return results;
}

module.exports = { getWeatherForMentionedCities };
