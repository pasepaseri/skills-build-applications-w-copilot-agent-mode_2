import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import brandMark from '../../../docs/octofitapp-small.png'
import './App.css'

const navigation = [
  { to: '/activities', label: 'Activities', marker: '01' },
  { to: '/leaderboard', label: 'Leaderboard', marker: '02' },
  { to: '/teams', label: 'Teams', marker: '03' },
  { to: '/users', label: 'Athletes', marker: '04' },
  { to: '/workouts', label: 'Workouts', marker: '05' },
]

function App() {
  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <NavLink className="brand-lockup" to="/activities" aria-label="OctoFit Tracker home">
          <img src={brandMark} alt="" />
          <span>
            <strong>OctoFit</strong>
            <small>TRACKER</small>
          </span>
        </NavLink>

        <div className="school-switcher">
          <span className="school-dot" />
          <span>Mergington High</span>
          <span className="switcher-caret" aria-hidden="true">v</span>
        </div>

        <div className="sidebar-label">TRACKER</div>
        <nav className="primary-nav" aria-label="Main navigation">
          {navigation.map(({ to, label, marker }) => (
            <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} key={to} to={to}>
              <span className="nav-marker">{marker}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <span className="avatar avatar-coach">PC</span>
          <span className="profile-copy">
            <strong>Paul Coach</strong>
            <small>PE instructor</small>
          </span>
          <span className="profile-menu" aria-hidden="true">...</span>
        </div>
      </aside>

      <div className="app-main">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span aria-hidden="true">/</span>
            <strong>Fitness tracker</strong>
          </div>
          <div className="api-status"><span /> OctoFit API</div>
        </header>

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to="/activities" replace />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/activities" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
