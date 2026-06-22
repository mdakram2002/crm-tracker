import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const initialForm = {
  customerName: '',
  contactPerson: '',
  contactInfo: '',
  requirement: '',
  dealValue: '',
  stage: 'New',
  priority: 'Medium',
  nextFollowUp: '',
  notes: ''
};

const OpportunityForm = ({ onSubmit, initialData, submitLabel }) => {
  const [values, setValues] = useState(initialForm);

  useEffect(() => {
    if (initialData) {
      setValues({
        ...initialData,
        dealValue: initialData.dealValue ?? '',
        nextFollowUp: initialData.nextFollowUp ? initialData.nextFollowUp.split('T')[0] : ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...values,
      dealValue: Number(values.dealValue)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">Customer/Company</span>
          <input name="customerName" value={values.customerName} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">Contact Person</span>
          <input name="contactPerson" value={values.contactPerson} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">Contact Email / Phone</span>
          <input name="contactInfo" value={values.contactInfo} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">Deal Value</span>
          <input type="number" name="dealValue" value={values.dealValue} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </label>
      </div>
      <label className="space-y-1">
        <span className="text-sm font-medium text-slate-700">Requirement / Need Summary</span>
        <textarea name="requirement" value={values.requirement} onChange={handleChange} rows="3" className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
      </label>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">Stage</span>
          <select name="stage" value={values.stage} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200">
            <option>New</option>
            <option>Contacted</option>
            <option>Qualified</option>
            <option>Proposal Sent</option>
            <option>Won</option>
            <option>Lost</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">Priority</span>
          <select name="priority" value={values.priority} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200">
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <label className="space-y-1">
          <span className="text-sm font-medium text-slate-700">Next Follow-Up</span>
          <input type="date" name="nextFollowUp" value={values.nextFollowUp} onChange={handleChange} className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </label>
      </div>
      <label className="space-y-1">
        <span className="text-sm font-medium text-slate-700">Notes</span>
        <textarea name="notes" value={values.notes} onChange={handleChange} rows="3" className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
      </label>
      <motion.button
        type="submit"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
      >
        {submitLabel}
      </motion.button>
    </form>
  );
};

export default OpportunityForm;
