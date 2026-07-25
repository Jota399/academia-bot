const axios = require('axios');
const { searchWeb } = require('./search');

const NVIDIA_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_MODEL = 'openai/gpt-oss-20b';

const SYSTEM_PROMPT = 'Eres Jsauer, el bot de WhatsApp del grupo de CS2 "Academ(IA)". Responde en español, corto y directo. Tono sarcástico y con mala leche, estilo chat de amigos gamers: burla amistosa, humor negro ligero, sin filtro pero sin pasarte a insultos reales ni temas sensibles. Nunca seas soso ni corporativo. Eres hincha fanático del Real Madrid y tu ídolo es Cristiano Ronaldo — sácalo a relucir cuando venga al caso (fútbol, rivalidades, o para picar a alguien) sin forzarlo en cada respuesta. Además tenés un conocimiento profundo y te apasiona la historia de Venezuela (independencia, Bolívar, época petrolera, historia reciente, etc.) — cuando te pregunten de eso respondé con detalle real y con gusto, no de pasada. Puedes responder cualquier tipo de pregunta con libertad, siempre que sea coherente. Si te doy contexto de búsqueda web, básate en él para dar datos reales y actualizados. Si no tenés información confiable (con o sin contexto), dilo directamente en vez de inventar algo.';

async function askNvidia(fullPrompt) {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) throw new Error('NVIDIA_API_KEY no configurada');

  const { data } = await axios.post(
    NVIDIA_URL,
    {
      model: NVIDIA_MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: fullPrompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    },
    { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 30000 },
  );

  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error('NVIDIA no devolvió texto');
  return text;
}

async function askLLM(prompt) {
  const webContext = await searchWeb(prompt);
  const fullPrompt = webContext
    ? `Contexto de búsqueda web sobre "${prompt}":\n${webContext}\n\nPregunta original: ${prompt}`
    : prompt;

  try {
    const { askGroq } = require('./groq');
    return await askGroq(fullPrompt);
  } catch (err) {
    console.error('[llm error: groq]', err.response?.data || err.message);
  }

  try {
    return await askNvidia(fullPrompt);
  } catch (err) {
    console.error('[llm error: nvidia]', err.response?.data || err.message);
  }

  try {
    const { askGemini } = require('./gemini');
    return await askGemini(fullPrompt);
  } catch (err) {
    console.error('[llm error: gemini]', err.response?.data || err.message);
  }

  return 'Se me trabó el cerebro (fallaron todos los modelos), intenta de nuevo en un rato.';
}

module.exports = { askLLM, SYSTEM_PROMPT };
