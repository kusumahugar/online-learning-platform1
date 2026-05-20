import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/api/auth/login', form);
      login(response.data);
      navigate('/courses');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
      <h1 className="text-3xl font-semibold text-white">Login</h1>
      <p className="mt-2 text-slate-400">Access courses and admin tools with your account.</p>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Password</label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            type="password"
            required
            className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </section>
  );
};

export default Login;
