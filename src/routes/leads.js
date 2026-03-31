/**
 * leads.js — Leads Router
 * ========================
 * Defines all routes for the /api/leads resource.
 * Authentication is applied to all routes via requireApiKey.
 * Business logic is delegated to leadsController.
 *
 * Author: José Neto @zNeto.AI
 */

const express = require('express');
const router = express.Router();
const requireApiKey = require('../middleware/auth');
const leadsController = require('../controllers/leadsController');

// Apply authentication middleware to all leads routes
router.use(requireApiKey);

// GET /api/leads
// Returns all leads, with optional ?status= and ?source= filters
router.get('/', leadsController.getAllLeads);

// GET /api/leads/:id
// Returns a single lead by ID
router.get('/:id', leadsController.getLeadById);

// POST /api/leads
// Creates a new lead record
router.post('/', leadsController.createLead);

// PATCH /api/leads/:id
// Updates lead status, score, or metadata
router.patch('/:id', leadsController.updateLead);

// DELETE /api/leads/:id
// Removes a lead record
router.delete('/:id', leadsController.deleteLead);

module.exports = router;
