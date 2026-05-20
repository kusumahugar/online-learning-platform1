import { useEffect, useState } from 'react';
import api from '../api/axios';

const initialForm = { title: '', description: '', instructor: '', price: 0, duration: '' };

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchCourses = async () => {
    try {
      const response = await api.get('/api/courses');
      setCourses(response.data);
    } catch (err) {
      setError('Unable to load courses.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (selectedCourse) {
        await api.put(`/api/courses/${selectedCourse._id}`, form);
        setSuccess('Course updated successfully.');
      } else {
        await api.post('/api/courses', form);
        setSuccess('Course created successfully.');
      }
      setForm(initialForm);
      setSelectedCourse(null);
      fetchCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed.');
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setForm({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      price: course.price,
      duration: course.duration,
    });
  };

  const handleDelete = async (id) => {
    setError('');
    setSuccess('');
    try {
      await api.delete(`/api/courses/${id}`);
      setSuccess('Course deleted successfully.');
      fetchCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Deletion failed.');
    }
  };

  const handleReset = () => {
    setSelectedCourse(null);
    setForm(initialForm);
    setError('');
    setSuccess('');
  };

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8">
        <h1 className="text-3xl font-semibold text-white">Admin Dashboard</h1>
        <p className="mt-2 text-slate-400">Create, update, and delete courses managed by your team.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8">
          <h2 className="text-2xl font-semibold text-white">{selectedCourse ? 'Edit Course' : 'New Course'}</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-300">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300">Instructor</label>
              <input
                name="instructor"
                value={form.instructor}
                onChange={handleChange}
                required
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows="4"
                className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm text-slate-300">Price</label>
                <input
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  type="number"
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300">Duration</label>
                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
                />
              </div>
            </div>
            {error && <p className="text-sm text-rose-400">{error}</p>}
            {success && <p className="text-sm text-emerald-400">{success}</p>}
            <div className="flex flex-wrap gap-4">
              <button type="submit" className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400">
                {selectedCourse ? 'Update Course' : 'Create Course'}
              </button>
              <button type="button" onClick={handleReset} className="rounded-2xl border border-slate-700 px-5 py-3 text-slate-100 hover:border-cyan-300">
                Reset
              </button>
            </div>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8">
          <h2 className="text-2xl font-semibold text-white">All Courses</h2>
          {loading ? (
            <p className="mt-4 text-slate-400">Loading courses...</p>
          ) : (
            <div className="mt-6 space-y-4">
              {courses.map((course) => (
                <div key={course._id} className="rounded-3xl border border-slate-800 bg-slate-950/80 p-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{course.instructor}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="rounded-2xl bg-slate-700 px-4 py-2 text-sm text-slate-100 hover:bg-slate-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="rounded-2xl bg-rose-600 px-4 py-2 text-sm text-white hover:bg-rose-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
