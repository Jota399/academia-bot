const axios = require('axios');
const cities = require('../config/cities.json');

const WEATHER_CODES = {
  0: 'despejado', 1: 'mayormente despejado', 2: 'parcialmente nublado', 3: 'nublado',
  45: 'neblina', 48: 'neblina helada',
  51: 'llovizna ligera', 53: 'llovizna', 55: 'llovizna intensa',
  61: 'lluvia ligera', 63: 'lluvia', 65: 'lluvia fuerte',
  80: 'chubascos ligeros', 81: 'chubascos', 82: 'chubascos fuertes',
  95: 'tormenta eléctrica',
};

async function fetchWeatherAt(lat, lon) {
  const { data } = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: { latitude: lat, longitude: lon, current: 'temperature_2m,weather_code', timezone: 'auto' },
    timeout: 10000,
  });
  const temp = Math.round(data.current.temperature_2m);
  const desc = WEATHER_CODES[data.current.weather_code] || 'condición desconocida';
  return { temp, desc };
}

async function getWeatherReport() {
  const lines = await Promise.all(cities.map(async (city) => {
    try {
      const { temp, desc } = await fetchWeatherAt(city.lat, city.lon);
      return `${city.name}: ${temp}°C, ${desc}`;
    } catch (err) {
      return `${city.name}: no se pudo obtener el clima`;
    }
  }));
  return `Clima de hoy:\n${lines.join('\n')}`;
}

async function geocodeCity(name) {
  const { data } = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
    params: { name, count: 1, language: 'es' },
    timeout: 10000,
  });
  const hit = data.results?.[0];
  if (!hit) return null;
  const label = hit.admin1 ? `${hit.name}, ${hit.admin1}, ${hit.country}` : `${hit.name}, ${hit.country}`;
  return { label, lat: hit.latitude, lon: hit.longitude };
}

async function getWeatherForCity(name) {
  const place = await geocodeCity(name);
  if (!place) return null;
  const { temp, desc } = await fetchWeatherAt(place.lat, place.lon);
  return `${place.label}: ${temp}°C, ${desc}`;
}

module.exports = { getWeatherReport, getWeatherForCity };
