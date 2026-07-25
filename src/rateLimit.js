const WINDOW_MS = 5 * 60 * 1000;
const MAX_PER_WINDOW = 5;

const usage = new Map();

function checkRateLimit(authorId) {
  const now = Date.now();
  const timestamps = (usage.get(authorId) || []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_PER_WINDOW) {
    const retryAfterMs = WINDOW_MS - (now - timestamps[0]);
    return { allowed: false, retryAfterSeconds: Math.ceil(retryAfterMs / 1000) };
  }

  timestamps.push(now);
  usage.set(authorId, timestamps);
  return { allowed: true };
}

module.exports = { checkRateLimit };
