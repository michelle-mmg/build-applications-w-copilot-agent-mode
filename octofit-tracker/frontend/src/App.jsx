import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';
import { getApiBaseUrl } from './api.js';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function App() {
  return (
    <main className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4 p-lg-5">
          <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-3 mb-4">
            <div>
              <h1 className="display-6 fw-bold mb-2">OctoFit Tracker</h1>
              <p className="lead text-muted mb-0">
                A multi-tier fitness app with environment-aware API routing for Codespaces and localhost.
              </p>
            </div>
            <div className="text-lg-end">
              <p className="mb-1 fw-semibold">API base</p>
              <code className="text-muted">{getApiBaseUrl()}</code>
            </div>
          </div>

          <div className="alert alert-info" role="status">
            Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use the Codespaces URL format. If it is unset, the app falls back to localhost.
          </div>

          <nav className="nav nav-pills flex-wrap gap-2 mb-4">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <Routes>
            <Route path="/" element={<div className="row g-4">
              <div className="col-lg-6">
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h2 className="h5">Overview</h2>
                    <p className="text-muted mb-0">Use the navigation above to explore users, activities, teams, leaderboard, and workouts.</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card h-100 border-0 bg-light">
                  <div className="card-body">
                    <h2 className="h5">Environment-aware API</h2>
                    <p className="text-muted mb-0">The app uses <code>import.meta.env.VITE_CODESPACE_NAME</code> to build Codespaces-friendly URLs automatically.</p>
                  </div>
                </div>
              </div>
            </div>} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
