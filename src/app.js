/**
 * app.js — Express Application Entry Point
 * =========================================
 * Sets up the Express app, registers global middleware,
 * mounts route files, and starts the HTTP server.
 *
 * Author: José Neto @zNeto.AI
 */

require('dotenv').config();

const express = require('express');
const leadsRouter = require('./routes/leads');
const webhooksRouter = require('./routes/webhooks');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Global Middleware ────────────────────────────────────────────────────────

// Parse incoming JSON request bodies
app.use(express.json());

// Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// Basic request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ─── Routes ──────────────────────────────────────────────────────────────────

app.use('/api/leads', leadsRouter);
app.use('/api/webhooks', webhooksRouter);

// Root health check
app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Node REST API Boilerplate — zNeto.AI',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler — catches any unmatched routes
app.use((_req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist.',
  });
});

// ─── Centralized Error Handler ───────────────────────────────────────────────

// Must be registered after all routes
app.use(errorHandler);

// ─── Server Start ────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
