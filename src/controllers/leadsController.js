/**
 * leadsController.js — Leads Business Logic
 * ===========================================
 * Handles all lead-related operations.
 * Uses an in-memory store for demonstration purposes —
 * replace with a real database adapter in production.
 *
 * Author: José Neto @zNeto.AI
 */

const { createError } = require('../middleware/errorHandler');

// In-memory store — replace with DB in production
const leadsStore = [
  {
    id: 'lead_001',
    name: 'Ana Lima',
    status: 'HOT',
    score: 9,
    source: 'WhatsApp',
    procedureInterest: 'Rhinoplasty',
    createdAt: new Date('2024-11-14T22:13:00Z').toISOString(),
    updatedAt: new Date('2024-11-14T22:13:00Z').toISOString(),
  },
  {
    id: 'lead_002',
    name: 'Carlos Melo',
    status: 'WARM',
    score: 6,
    source: 'Web Form',
    procedureInterest: 'Consultation',
    createdAt: new Date('2024-11-14T19:45:00Z').toISOString(),
    updatedAt: new Date('2024-11-14T19:45:00Z').toISOString(),
  },
];

// GET /api/leads
async function getAllLeads(req, res, next) {
  try {
    const { status, source } = req.query;

    let results = [...leadsStore];

    if (status) {
      results = results.filter(
        l => l.status.toLowerCase() === status.toLowerCase()
      );
    }

    if (source) {
      results = results.filter(
        l => l.source.toLowerCase() === source.toLowerCase()
      );
    }

    res.json({
      count: results.length,
      leads: results,
    });
  } catch (err) {
    next(err);
  }
}

// GET /api/leads/:id
async function getLeadById(req, res, next) {
  try {
    const lead = leadsStore.find(l => l.id === req.params.id);

    if (!lead) {
      throw createError(404, `Lead with id '${req.params.id}' not found.`);
    }

    res.json(lead);
  } catch (err) {
    next(err);
  }
}

// POST /api/leads
async function createLead(req, res, next) {
  try {
    const { name, source, status, score, procedureInterest } = req.body;

    if (!name) {
      throw createError(400, "Missing required field: 'name'.");
    }

    if (!source) {
      throw createError(400, "Missing required field: 'source'.");
    }

    const validStatuses = ['HOT', 'WARM', 'COLD', 'URGENT'];
    if (status && !validStatuses.includes(status.toUpperCase())) {
      throw createError(
        400,
        `Invalid status '${status}'. Must be one of: ${validStatuses.join(', ')}.`
      );
    }

    const newLead = {
      id: `lead_${Date.now()}`,
      name,
      status: status ? status.toUpperCase() : 'WARM',
      score: score ?? 5,
      source,
      procedureInterest: procedureInterest || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    leadsStore.push(newLead);

    res.status(201).json(newLead);
  } catch (err) {
    next(err);
  }
}

// PATCH /api/leads/:id
async function updateLead(req, res, next) {
  try {
    const index = leadsStore.findIndex(l => l.id === req.params.id);

    if (index === -1) {
      throw createError(404, `Lead with id '${req.params.id}' not found.`);
    }

    const allowedFields = ['name', 'status', 'score', 'source', 'procedureInterest'];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.status) {
      updates.status = updates.status.toUpperCase();
    }

    leadsStore[index] = {
      ...leadsStore[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    res.json(leadsStore[index]);
  } catch (err) {
    next(err);
  }
}

// DELETE /api/leads/:id
async function deleteLead(req, res, next) {
  try {
    const index = leadsStore.findIndex(l => l.id === req.params.id);

    if (index === -1) {
      throw createError(404, `Lead with id '${req.params.id}' not found.`);
    }

    const deleted = leadsStore.splice(index, 1)[0];

    res.json({
      message: 'Lead deleted successfully.',
      deleted,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};
