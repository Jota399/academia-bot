const axios = require('axios');

const TAVILY_URL = 'https://api.tavily.com/search';

async function searchWeb(query) {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) return null;

  try {
    const { data } = await axios.post(
      TAVILY_URL,
      {
        api_key: apiKey,
        query,
        search_depth: 'basic',
        include_answer: true,
        max_results: 4,
      },
      { timeout: 10000 },
    );

    const lines = [];
    if (data.answer) lines.push(`Resumen: ${data.answer}`);
    for (const r of data.results || []) {
      lines.push(`- ${r.title}: ${r.content}`.slice(0, 400));
    }
    return lines.length > 0 ? lines.join('\n') : null;
  } catch (err) {
    console.error('[search error]', err.response?.data || err.message);
    return null;
  }
}

module.exports = { searchWeb };
