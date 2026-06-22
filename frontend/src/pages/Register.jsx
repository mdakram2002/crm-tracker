import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
      <h1 className="mb-4 text-3xl font-semibold text-slate-900">Register</h1>
      <p className="mb-6 text-sm text-slate-500">Create your account to start tracking sales opportunities in one shared pipeline.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} className="mt-1 w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 transition focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        {error && <p className="rounded-md bg-rose-50 px-4 py-2 text-sm text-rose-700">{error}</p>}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.01 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </motion.button>
      </form>
      <p className="mt-4 text-sm text-slate-500">
        Already have an account? <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-700">Login</Link>
      </p>
    </div>
  );
};

export default Register;
