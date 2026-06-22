import { motion } from 'framer-motion';
import { format } from 'date-fns';

const OpportunityCard = ({ opportunity, currentUser, onEdit, onDelete }) => {
  const isOwner = currentUser && currentUser.id === opportunity.createdById;
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/40 transition hover:-translate-y-0.5 hover:shadow-2xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{opportunity.customerName}</h3>
          <p className="mt-1 text-sm leading-6 text-slate-600">{opportunity.requirement}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-slate-700">
          <span className="rounded-full bg-slate-100 px-3 py-1">Stage: {opportunity.stage}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Priority: {opportunity.priority}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">Value: ${opportunity.dealValue}</span>
        </div>
      </div>
      <div className="mt-3 space-y-2 text-sm text-slate-600">
        <p>Contact: {opportunity.contactPerson} ({opportunity.contactInfo})</p>
        <p>Next follow-up: {opportunity.nextFollowUp ? format(new Date(opportunity.nextFollowUp), 'MMM d, yyyy') : 'N/A'}</p>
        <p>Created by: {opportunity.createdBy}</p>
        <p>Created at: {format(new Date(opportunity.createdAt), 'MMM d, yyyy')}</p>
      </div>
      {opportunity.notes ? <p className="mt-3 text-sm text-slate-700">Notes: {opportunity.notes}</p> : null}
      {isOwner ? (
        <div className="mt-4 flex flex-wrap gap-3">
          <motion.button
            onClick={() => onEdit(opportunity)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Edit
          </motion.button>
          <motion.button
            onClick={() => onDelete(opportunity)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
          >
            Delete
          </motion.button>
        </div>
      ) : null}
    </div>
  );
};

export default OpportunityCard;
