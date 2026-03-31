# 🚀 Node.js REST API Boilerplate — zNeto.AI

A production-ready Node.js REST API starter built with Express.
Structured for real projects — clean folder organization, auth
middleware, centralized error handling, and documented endpoints
ready to extend.

Built as the backend foundation for AI automation systems,
webhook receivers, and data pipelines at zNeto.AI.

---

## 🏗️ Architecture Overview
```
src/
├── app.js              # Express app setup and middleware registration
├── routes/             # Route definitions — one file per resource
│   ├── leads.js        # Lead management endpoints
│   └── webhooks.js     # Webhook intake endpoints
├── controllers/        # Business logic — one file per resource
│   ├── leadsController.js
│   └── webhookController.js
└── middleware/         # Reusable middleware
    ├── auth.js         # API key authentication
    └── errorHandler.js # Centralized error handling
```

---

## ⚡ Quick Start
```bash
# 1. Clone the repository
git clone https://github.com/joseneto-ai/node-rest-api-boilerplate

# 2. Navigate into the project
cd node-rest-api-boilerplate

# 3. Install dependencies
npm install

# 4. Configure environment variables
cp .env.example .env
# Edit .env with your values

# 5. Start the development server
npm run dev
```

Server runs at `http://localhost:3000` by default.

---

## 📡 Available Endpoints

### Leads

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/leads` | ✅ | List all leads with optional filters |
| `GET` | `/api/leads/:id` | ✅ | Get a single lead by ID |
| `POST` | `/api/leads` | ✅ | Create a new lead |
| `PATCH` | `/api/leads/:id` | ✅ | Update lead status or score |
| `DELETE` | `/api/leads/:id` | ✅ | Delete a lead record |

### Webhooks

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/webhooks/whatsapp` | ❌ | Receive WhatsApp Business API events |
| `POST` | `/api/webhooks/generic` | ❌ | Receive generic automation events |
| `GET` | `/api/webhooks/health` | ❌ | Health check endpoint |

---

## 🔐 Authentication

All `/api/leads` endpoints require an `x-api-key` header:
```bash
curl -H "x-api-key: your-api-key-here" \
     http://localhost:3000/api/leads
```

Webhook endpoints are intentionally public to receive
external events from WhatsApp Business API and n8n.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` and configure:
```
PORT=3000
API_KEY=your-secret-api-key
NODE_ENV=development
```

---

## 🛠️ Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express 4
- **Auth:** Custom API key middleware
- **Error Handling:** Centralized async error handler
- **Dev tooling:** nodemon for hot reload

---

## 📦 Dependencies
```bash
npm install express dotenv
npm install --save-dev nodemon
```

---

## 📄 API Reference

Full request/response documentation:
→ [`docs/api-reference.md`](./docs/api-reference.md)

---

## 👤 Author

**José Neto** — AI Automation Engineer & Founder @zNeto.AI

[![LinkedIn](https://img.shields.io/badge/LinkedIn-José%20Neto-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/jos%C3%A9-neto-b88558398)
[![GitHub](https://img.shields.io/badge/GitHub-joseneto--ai-181717?style=flat&logo=github)](https://github.com/joseneto-ai)
