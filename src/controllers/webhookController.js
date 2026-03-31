/**
 * webhookController.js — Webhook Event Handlers
 * ===============================================
 * Handles incoming webhook events from external sources.
 * Parses, validates, and logs events for downstream processing.
 *
 * In production: replace console.log with a queue, DB write,
 * or n8n trigger call.
 *
 * Author: José Neto @zNeto.AI
 */

// GET /api/webhooks/health
function healthCheck(_req, res) {
  res.json({
    status: 'ok',
    service: 'webhook-receiver',
    timestamp: new Date().toISOString(),
  });
}

// POST /api/webhooks/whatsapp
function receiveWhatsApp(req, res) {
  try {
    const payload = req.body;

    // Validate basic WhatsApp Business API structure
    if (!payload.entry || !Array.isArray(payload.entry)) {
      return res.status(400).json({
        error: 'Invalid Payload',
        message: 'Expected WhatsApp Business API webhook format.',
      });
    }

    // Extract message data from Meta's nested structure
    const entry = payload.entry[0];
    const change = entry?.changes?.[0]?.value;
    const message = change?.messages?.[0];

    if (!message) {
      // Meta sends verification requests and status updates
      // that don't contain messages — acknowledge and return
      return res.status(200).json({ received: true, type: 'non-message-event' });
    }

    const event = {
      type: 'whatsapp_message',
      senderId: message.from,
      messageText: message.text?.body || '',
      timestamp: new Date(parseInt(message.timestamp) * 1000).toISOString(),
      receivedAt: new Date().toISOString(),
    };

    // TODO: forward to queue or n8n trigger
    console.log('[webhook/whatsapp] Event received:', JSON.stringify(event));

    res.status(200).json({ received: true, event });
  } catch (err) {
    console.error('[webhook/whatsapp] Error:', err.message);
    res.status(500).json({ error: 'Webhook processing failed.' });
  }
}

// POST /api/webhooks/generic
function receiveGeneric(req, res) {
  try {
    const payload = req.body;

    if (!payload || typeof payload !== 'object') {
      return res.status(400).json({
        error: 'Invalid Payload',
        message: 'Request body must be a JSON object.',
      });
    }

    const event = {
      type: 'generic_event',
      source: payload.source || 'unknown',
      data: payload,
      receivedAt: new Date().toISOString(),
    };

    // TODO: forward to queue or n8n trigger
    console.log('[webhook/generic] Event received:', JSON.stringify(event));

    res.status(200).json({ received: true, event });
  } catch (err) {
    console.error('[webhook/generic] Error:', err.message);
    res.status(500).json({ error: 'Webhook processing failed.' });
  }
}

module.exports = {
  healthCheck,
  receiveWhatsApp,
  receiveGeneric,
};
