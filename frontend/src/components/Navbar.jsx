import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 shadow-xl shadow-slate-900/10 backdrop-blur backdrop-saturate-150">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-semibold tracking-tight text-white">
          CRM Tracker
        </Link>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-slate-200">{user.name}</span>
              <motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="rounded bg-indigo-600 px-4 py-2 text-white shadow-sm transition hover:bg-indigo-700"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <> 
              <Link to="/login" className="text-slate-200 hover:text-white">
                Login
              </Link>
              <Link to="/register" className="rounded border border-slate-700 bg-slate-900 px-4 py-2 text-white shadow-sm transition hover:bg-slate-800">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
