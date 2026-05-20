import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
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
    fetchCourses();
  }, []);

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8">
        <h1 className="text-3xl font-semibold text-white">All Courses</h1>
        <p className="mt-2 text-slate-400">Browse available learning paths and find the course that fits you.</p>
      </div>
      {loading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300">Loading courses...</div>
      ) : error ? (
        <div className="rounded-3xl border border-rose-500/30 bg-rose-950/20 p-8 text-rose-300">{error}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <article key={course._id} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/10">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-white">{course.title}</h2>
                <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm text-cyan-300">
                  {course.duration}
                </span>
              </div>
              <p className="mt-4 text-slate-400">{course.description}</p>
              <p className="mt-4 text-sm text-slate-500">Instructor: {course.instructor}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/courses/${course._id}`}
                  className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  View details
                </Link>
                <span className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300">${course.price}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Courses;
