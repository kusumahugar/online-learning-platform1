import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/10">
        <h1 className="text-4xl font-semibold text-cyan-300">Online Learning platform</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Browse courses, enroll as a student, and manage course content as an admin. This platform includes authentication,
          role-based access, and responsive UI.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/courses" className="rounded bg-cyan-500 px-5 py-3 font-medium text-slate-950 hover:bg-cyan-400">
            Browse Courses
          </Link>
          <Link to="/register" className="rounded border border-slate-700 px-5 py-3 text-slate-100 hover:border-cyan-300 hover:text-white">
            Create Account
          </Link>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-xl font-semibold text-white">Student Experience</h2>
          <p className="mt-3 text-slate-400">Discover courses, read details, and enroll with a simple click.</p>
        </article>
        <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-xl font-semibold text-white">Admin Tools</h2>
          <p className="mt-3 text-slate-400">Create, update, and remove courses in the admin dashboard.</p>
        </article>
        <article className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6">
          <h2 className="text-xl font-semibold text-white">Secure Access</h2>
          <p className="mt-3 text-slate-400">JWT authentication and role-based routes keep your app safe.</p>
        </article>
      </div>
    </section>
  );
};

export default Home;
