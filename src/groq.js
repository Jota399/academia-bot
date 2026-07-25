const axios = require('axios');
const { SYSTEM_PROMPT } = require('./llm');

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

async function askGroq(prompt) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY no configurada');

  const { data } = await axios.post(
    GROQ_URL,
    {
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    },
    { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 30000 },
  );

  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error('Groq no devolvió texto');
  return text;
}

module.exports = { askGroq };
