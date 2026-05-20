import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get('/api/courses');
        const found = response.data.find((item) => item._id === id);
        if (found) {
          setCourse(found);
        } else {
          setError('Course not found.');
        }
      } catch (err) {
        setError('Unable to fetch course details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    setMessage('');
    try {
      await api.post(`/api/courses/${id}/enroll`);
      setMessage('Enrollment successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Enrollment failed.');
    }
  };

  if (loading) {
    return <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">Loading...</div>;
  }

  if (error) {
    return <div className="rounded-3xl border border-rose-500 bg-rose-950/20 p-8 text-rose-300">{error}</div>;
  }

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl shadow-slate-950/10">
        <h1 className="text-3xl font-semibold text-white">{course.title}</h1>
        <p className="mt-3 text-slate-400">{course.description}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
            <h2 className="text-sm uppercase tracking-wide text-slate-400">Instructor</h2>
            <p className="mt-2 text-white">{course.instructor}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
            <h2 className="text-sm uppercase tracking-wide text-slate-400">Duration</h2>
            <p className="mt-2 text-white">{course.duration}</p>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
            <h2 className="text-sm uppercase tracking-wide text-slate-400">Price</h2>
            <p className="mt-2 text-white">${course.price}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            onClick={handleEnroll}
            disabled={!user}
            className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Enroll now
          </button>
          {!user && <p className="text-slate-400">Sign in to enroll in this course.</p>}
        </div>
        {message && <p className="mt-4 text-slate-200">{message}</p>}
      </div>
    </section>
  );
};

export default CourseDetails;
