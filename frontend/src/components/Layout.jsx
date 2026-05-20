import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link to="/" className="text-2xl font-semibold text-cyan-300">
            LearnPlatform
          </Link>

          <nav className="flex flex-wrap items-center gap-3">
            <Link to="/" className="hover:text-white">
              Home
            </Link>

            <Link to="/courses" className="hover:text-white">
              Courses
            </Link>

            {user?.role === 'admin' && (
              <Link to="/admin" className="hover:text-white">
                Admin
              </Link>
            )}

            {!user && (
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            )}

            {!user && (
              <Link to="/register" className="hover:text-white">
                Register
              </Link>
            )}

            {user && (
              <button
                onClick={logout}
                className="rounded bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-cyan-400"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/90 py-6 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} Online Learning Platform
      </footer>
    </div>
  );
};

export default Layout;