const axios = require('axios');
const { SYSTEM_PROMPT } = require('./llm');

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

async function askGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error('GEMINI_API_KEY no configurada');

  const { data } = await axios.post(
    GEMINI_URL,
    {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: { maxOutputTokens: 500, temperature: 0.8 },
    },
    { params: { key: apiKey }, timeout: 30000 },
  );

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!text) throw new Error('Gemini no devolvió texto');
  return text;
}

module.exports = { askGemini };
