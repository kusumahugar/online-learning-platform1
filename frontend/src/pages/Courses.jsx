import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

// Sample courses shown if database is empty or API fails
const sampleCourses = [
  {
    _id: '1',
    title: 'Full Stack Web Development',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB.',
    instructor: 'John Smith',
    duration: '12 Weeks',
    price: 499,
  },
  {
    _id: '2',
    title: 'Python Programming Masterclass',
    description: 'Master Python from basics to advanced concepts with real-world projects.',
    instructor: 'Sarah Johnson',
    duration: '8 Weeks',
    price: 399,
  },
  {
    _id: '3',
    title: 'Data Structures and Algorithms',
    description: 'Prepare for coding interviews with practical DSA problems.',
    instructor: 'David Lee',
    duration: '10 Weeks',
    price: 599,
  },
  {
    _id: '4',
    title: 'DevOps with Docker and Jenkins',
    description: 'Build CI/CD pipelines using Docker, Jenkins, GitHub, and Kubernetes.',
    instructor: 'Michael Brown',
    duration: '6 Weeks',
    price: 699,
  },
  {
    _id: '5',
    title: 'Machine Learning Fundamentals',
    description: 'Learn supervised and unsupervised learning using Python.',
    instructor: 'Emily Davis',
    duration: '14 Weeks',
    price: 899,
  },
  {
    _id: '6',
    title: 'UI/UX Design Essentials',
    description: 'Design modern, responsive, and user-friendly interfaces.',
    instructor: 'Sophia Wilson',
    duration: '5 Weeks',
    price: 299,
  },
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // IMPORTANT: remove extra /api
        const response = await api.get('/courses');

        if (Array.isArray(response.data) && response.data.length > 0) {
          setCourses(response.data);
        } else {
          setCourses(sampleCourses);
        }
      } catch (error) {
        console.error('Failed to load courses:', error);
        setCourses(sampleCourses);
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
        <p className="mt-2 text-slate-400">
          Browse available learning paths and find the course that fits you.
        </p>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-slate-300">
          Loading courses...
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course._id}
              className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/10"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-white">
                  {course.title}
                </h2>

                <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm text-cyan-300">
                  {course.duration}
                </span>
              </div>

              <p className="mt-4 text-slate-400">{course.description}</p>

              <p className="mt-4 text-sm text-slate-500">
                Instructor: {course.instructor}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={`/courses/${course._id}`}
                  className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  View Details
                </Link>

                <span className="rounded-2xl border border-slate-700 px-4 py-2 text-sm text-slate-300">
                  ${course.price}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Courses;