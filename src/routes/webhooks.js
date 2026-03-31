/**
 * webhooks.js — Webhooks Router
 * ==============================
 * Defines endpoints for receiving external webhook events.
 * These routes are intentionally public (no auth) to allow
 * WhatsApp Business API and n8n to POST events freely.
 *
 * Author: José Neto @zNeto.AI
 */

const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');

// GET /api/webhooks/health
// Public health check — used by uptime monitors and load balancers
router.get('/health', webhookController.healthCheck);

// POST /api/webhooks/whatsapp
// Receives incoming events from WhatsApp Business API (Meta)
router.post('/whatsapp', webhookController.receiveWhatsApp);

// POST /api/webhooks/generic
// Receives generic automation events from n8n or other sources
router.post('/generic', webhookController.receiveGeneric);

module.exports = router;
