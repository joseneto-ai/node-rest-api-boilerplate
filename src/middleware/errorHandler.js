/**
 * errorHandler.js — Centralized Error Handler
 * ============================================
 * Catches any error passed to next(err) from route handlers
 * or controllers and returns a consistent JSON error response.
 *
 * This prevents unhandled errors from crashing the server
 * and ensures every error returns the same response shape.
 *
 * Author: José Neto @zNeto.AI
 */

function errorHandler(err, req, res, _next) {
  // Log the full error stack in development only
  if (process.env.NODE_ENV !== 'production') {
    console.error('[error]', err.stack || err.message);
  }

  // Use the error's status code if set, otherwise default to 500
  const statusCode = err.statusCode || err.status || 500;

  const response = {
    error: err.name || 'Internal Server Error',
    message: err.message || 'An unexpected error occurred.',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  };

  res.status(statusCode).json(response);
}

/**
 * Creates a structured error with a custom status code.
 * Use inside controllers to throw meaningful HTTP errors.
 *
 * Example:
 *   throw createError(404, 'Lead not found');
 *   throw createError(400, 'Missing required field: name');
 */
function createError(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  return err;
}

module.exports = errorHandler;
module.exports.createError = createError;
