const express = require('express');
const { body } = require('express-validator');
const { protect } = require('../middleware/authMiddleware');
const { createOpportunity, getOpportunities, updateOpportunity, deleteOpportunity } = require('../controllers/opportunityController');

const router = express.Router();

const createOpportunityValidation = [
  body('customerName').notEmpty().withMessage('Customer name is required'),
  body('contactPerson').notEmpty().withMessage('Contact person name is required'),
  body('contactInfo').notEmpty().withMessage('Contact email or phone is required'),
  body('requirement').notEmpty().withMessage('Requirement summary is required'),
  body('dealValue').isNumeric().withMessage('Deal value must be a number')
];

const updateOpportunityValidation = [
  body('customerName').optional().notEmpty().withMessage('Customer name cannot be empty'),
  body('contactPerson').optional().notEmpty().withMessage('Contact person name cannot be empty'),
  body('contactInfo').optional().notEmpty().withMessage('Contact email or phone cannot be empty'),
  body('requirement').optional().notEmpty().withMessage('Requirement summary cannot be empty'),
  body('dealValue').optional().isNumeric().withMessage('Deal value must be a number'),
  body('stage').optional().isIn(['New','Contacted','Qualified','Proposal Sent','Won','Lost']).withMessage('Invalid stage'),
  body('priority').optional().isIn(['Low','Medium','High']).withMessage('Invalid priority')
];

router.use(protect);
router.route('/').get(getOpportunities).post(createOpportunityValidation, createOpportunity);
router.route('/:id').put(updateOpportunityValidation, updateOpportunity).delete(deleteOpportunity);

module.exports = router;
