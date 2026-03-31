# API Reference — Node REST API Boilerplate

Base URL: `http://localhost:3000`

All protected endpoints require the header:
```
x-api-key: your-api-key-here
```

---

## Leads

### GET /api/leads

Returns all leads. Supports optional query filters.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `status` | string | Filter by status: `HOT`, `WARM`, `COLD`, `URGENT` |
| `source` | string | Filter by source: `WhatsApp`, `Web Form`, etc. |

**Request:**
```bash
curl -H "x-api-key: your-key" \
     http://localhost:3000/api/leads?status=HOT
```

**Response — 200 OK:**
```json
{
  "count": 1,
  "leads": [
    {
      "id": "lead_001",
      "name": "Ana Lima",
      "status": "HOT",
      "score": 9,
      "source": "WhatsApp",
      "procedureInterest": "Rhinoplasty",
      "createdAt": "2024-11-14T22:13:00.000Z",
      "updatedAt": "2024-11-14T22:13:00.000Z"
    }
  ]
}
```

---

### GET /api/leads/:id

Returns a single lead by ID.

**Request:**
```bash
curl -H "x-api-key: your-key" \
     http://localhost:3000/api/leads/lead_001
```

**Response — 200 OK:**
```json
{
  "id": "lead_001",
  "name": "Ana Lima",
  "status": "HOT",
  "score": 9,
  "source": "WhatsApp",
  "procedureInterest": "Rhinoplasty",
  "createdAt": "2024-11-14T22:13:00.000Z",
  "updatedAt": "2024-11-14T22:13:00.000Z"
}
```

**Response — 404 Not Found:**
```json
{
  "error": "Error",
  "message": "Lead with id 'lead_999' not found."
}
```

---

### POST /api/leads

Creates a new lead record.

**Required fields:** `name`, `source`

**Request:**
```bash
curl -X POST \
     -H "x-api-key: your-key" \
     -H "Content-Type: application/json" \
     -d '{"name":"Beatriz Rocha","source":"Landing Page","status":"WARM","score":6}' \
     http://localhost:3000/api/leads
```

**Response — 201 Created:**
```json
{
  "id": "lead_1700000000000",
  "name": "Beatriz Rocha",
  "status": "WARM",
  "score": 6,
  "source": "Landing Page",
  "procedureInterest": null,
  "createdAt": "2024-11-14T22:30:00.000Z",
  "updatedAt": "2024-11-14T22:30:00.000Z"
}
```

**Response — 400 Bad Request:**
```json
{
  "error": "Error",
  "message": "Missing required field: 'name'."
}
```

---

### PATCH /api/leads/:id

Updates one or more fields of an existing lead.

**Updatable fields:** `name`, `status`, `score`, `source`, `procedureInterest`

**Request:**
```bash
curl -X PATCH \
     -H "x-api-key: your-key" \
     -H "Content-Type: application/json" \
     -d '{"status":"HOT","score":9}' \
     http://localhost:3000/api/leads/lead_002
```

**Response — 200 OK:**
```json
{
  "id": "lead_002",
  "name": "Carlos Melo",
  "status": "HOT",
  "score": 9,
  "source": "Web Form",
  "procedureInterest": "Consultation",
  "createdAt": "2024-11-14T19:45:00.000Z",
  "updatedAt": "2024-11-14T23:00:00.000Z"
}
```

---

### DELETE /api/leads/:id

Permanently removes a lead record.

**Request:**
```bash
curl -X DELETE \
     -H "x-api-key: your-key" \
     http://localhost:3000/api/leads/lead_002
```

**Response — 200 OK:**
```json
{
  "message": "Lead deleted successfully.",
  "deleted": {
    "id": "lead_002",
    "name": "Carlos Melo"
  }
}
```

---

## Webhooks

### GET /api/webhooks/health

Public health check. No authentication required.

**Request:**
```bash
curl http://localhost:3000/api/webhooks/health
```

**Response — 200 OK:**
```json
{
  "status": "ok",
  "service": "webhook-receiver",
  "timestamp": "2024-11-14T22:13:00.000Z"
}
```

---

### POST /api/webhooks/whatsapp

Receives incoming events from WhatsApp Business API.
No authentication required — configure this URL in your
Meta Developer App webhook settings.

**Request:**
```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"entry":[{"changes":[{"value":{"messages":[{"from":"5531999990000","text":{"body":"I want to book an appointment"},"timestamp":"1700000000"}]}}]}]}' \
     http://localhost:3000/api/webhooks/whatsapp
```

**Response — 200 OK:**
```json
{
  "received": true,
  "event": {
    "type": "whatsapp_message",
    "senderId": "5531999990000",
    "messageText": "I want to book an appointment",
    "timestamp": "2023-11-14T22:13:20.000Z",
    "receivedAt": "2024-11-14T22:13:21.000Z"
  }
}
```

---

### POST /api/webhooks/generic

Receives automation events from n8n or any other source.
No authentication required.

**Request:**
```bash
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"source":"n8n","event":"lead_qualified","leadId":"lead_001","score":9}' \
     http://localhost:3000/api/webhooks/generic
```

**Response — 200 OK:**
```json
{
  "received": true,
  "event": {
    "type": "generic_event",
    "source": "n8n",
    "data": {
      "source": "n8n",
      "event": "lead_qualified",
      "leadId": "lead_001",
      "score": 9
    },
    "receivedAt": "2024-11-14T22:13:21.000Z"
  }
}
```

---

## Error Response Format

All errors follow a consistent structure:
```json
{
  "error": "Error type name",
  "message": "Human-readable description of what went wrong."
}
```

| Status Code | Meaning |
|---|---|
| `200` | Success |
| `201` | Resource created |
| `400` | Bad request — invalid or missing fields |
| `401` | Unauthorized — missing or invalid API key |
| `404` | Resource not found |
| `500` | Internal server error |
