import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import OpportunityCard from '../components/OpportunityCard';
import OpportunityForm from '../components/OpportunityForm';

const Dashboard = () => {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  const fetchOpportunities = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/opportunities');
      setOpportunities(data);
    } catch (err) {
      setError('Unable to load opportunities');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  const handleCreate = async (payload) => {
    setError('');
    try {
      await api.post('/opportunities', payload);
      setFormVisible(false);
      setSelected(null);
      fetchOpportunities();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create opportunity');
    }
  };

  const handleUpdate = async (payload) => {
    setError('');
    try {
      await api.put(`/opportunities/${selected.id}`, payload);
      setSelected(null);
      setFormVisible(false);
      fetchOpportunities();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update opportunity');
    }
  };

  const handleDelete = async (opportunity) => {
    if (!window.confirm('Delete this opportunity?')) return;
    try {
      await api.delete(`/opportunities/${opportunity.id}`);
      fetchOpportunities();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete opportunity');
    }
  };

  const handleEdit = (opportunity) => {
    setSelected(opportunity);
    setFormVisible(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Opportunity Dashboard</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Welcome back, {user.name}. Manage your shared sales pipeline with confidence and clarity.</p>
        </div>
        <button onClick={() => { setFormVisible((prev) => !prev); setSelected(null); }} className="rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700">
          {formVisible ? 'Hide Form' : 'New Opportunity'}
        </button>
      </div>
      {formVisible ? (
        <OpportunityForm
          onSubmit={selected ? handleUpdate : handleCreate}
          initialData={selected}
          submitLabel={selected ? 'Update Opportunity' : 'Create Opportunity'}
        />
      ) : null}
      {error && <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-sm">{error}</p>}
      {loading ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600 shadow-sm">Loading opportunities...</div>
      ) : opportunities.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600 shadow-sm">No opportunities yet.</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.id}
              opportunity={opportunity}
              currentUser={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
