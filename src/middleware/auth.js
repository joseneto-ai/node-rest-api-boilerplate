/**
 * auth.js — API Key Authentication Middleware
 * ============================================
 * Validates the x-api-key header on protected routes.
 * Returns 401 if the key is missing or incorrect.
 *
 * Usage: apply to any router or individual route that
 * requires authentication.
 *
 * Author: José Neto @zNeto.AI
 */

function requireApiKey(req, res, next) {
  const providedKey = req.headers['x-api-key'];
  const validKey = process.env.API_KEY;

  if (!validKey) {
    console.warn('[auth] WARNING: API_KEY is not set in environment variables.');
    return res.status(500).json({
      error: 'Server Misconfiguration',
      message: 'API key is not configured on the server.',
    });
  }

  if (!providedKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing x-api-key header.',
    });
  }

  if (providedKey !== validKey) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid API key.',
    });
  }

  next();
}

module.exports = requireApiKey;
