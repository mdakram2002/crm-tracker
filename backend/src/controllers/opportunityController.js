const { validationResult } = require('express-validator');
const Opportunity = require('../models/Opportunity');

const createOpportunity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { customerName, contactPerson, contactInfo, requirement, dealValue, stage, priority, nextFollowUp, notes } = req.body;
  const opportunity = await Opportunity.create({
    customerName,
    contactPerson,
    contactInfo,
    requirement,
    dealValue,
    stage,
    priority,
    nextFollowUp,
    notes,
    createdBy: req.user._id
  });

  res.status(201).json(opportunity);
};

const getOpportunities = async (req, res) => {
  const opportunities = await Opportunity.find()
    .populate('createdBy', 'name')
    .sort({ createdAt: -1 });

  res.json(opportunities.map((item) => ({
    id: item._id,
    customerName: item.customerName,
    contactPerson: item.contactPerson,
    contactInfo: item.contactInfo,
    requirement: item.requirement,
    dealValue: item.dealValue,
    stage: item.stage,
    priority: item.priority,
    nextFollowUp: item.nextFollowUp,
    notes: item.notes,
    createdBy: item.createdBy.name,
    createdById: item.createdBy._id,
    createdAt: item.createdAt
  })));
};

const updateOpportunity = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const opportunity = await Opportunity.findById(req.params.id);
  if (!opportunity) {
    return res.status(404).json({ message: 'Opportunity not found' });
  }
  if (opportunity.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to update this opportunity' });
  }

  const { customerName, contactPerson, contactInfo, requirement, dealValue, stage, priority, nextFollowUp, notes } = req.body;

  opportunity.customerName = customerName ?? opportunity.customerName;
  opportunity.contactPerson = contactPerson ?? opportunity.contactPerson;
  opportunity.contactInfo = contactInfo ?? opportunity.contactInfo;
  opportunity.requirement = requirement ?? opportunity.requirement;
  opportunity.dealValue = dealValue ?? opportunity.dealValue;
  opportunity.stage = stage ?? opportunity.stage;
  opportunity.priority = priority ?? opportunity.priority;
  opportunity.nextFollowUp = nextFollowUp ?? opportunity.nextFollowUp;
  opportunity.notes = notes ?? opportunity.notes;

  const updated = await opportunity.save();
  res.json(updated);
};

const deleteOpportunity = async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);
  if (!opportunity) {
    return res.status(404).json({ message: 'Opportunity not found' });
  }
  if (opportunity.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized to delete this opportunity' });
  }

  await opportunity.remove();
  res.json({ message: 'Opportunity deleted successfully' });
};

module.exports = { createOpportunity, getOpportunities, updateOpportunity, deleteOpportunity };
