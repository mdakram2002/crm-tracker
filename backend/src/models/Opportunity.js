const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  contactPerson: { type: String, required: true, trim: true },
  contactInfo: { type: String, required: true, trim: true },
  requirement: { type: String, required: true, trim: true },
  dealValue: { type: Number, required: true, min: 0 },
  stage: {
    type: String,
    enum: ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'],
    default: 'New'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Medium'
  },
  nextFollowUp: { type: Date },
  notes: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', opportunitySchema);
