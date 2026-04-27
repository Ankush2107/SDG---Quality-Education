import { NavLink, useNavigate } from 'react-router-dom'
import { FiZap, FiHome, FiMap, FiMessageSquare, FiFolder, FiBookOpen, FiUser, FiUsers, FiDatabase, FiLogOut, FiShield } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../ui/Avatar'
import toast from 'react-hot-toast'
import ThemeToggle from '../ui/ThemeToggle'

const navLinks = [
  { to: '/dashboard', icon: <FiHome />, label: 'Dashboard' },
  { to: '/roadmap', icon: <FiMap />, label: 'My Roadmap' },
  { to: '/chat', icon: <FiMessageSquare />, label: 'AI Chat' },
  { to: '/projects', icon: <FiFolder />, label: 'Project Ideas' },
  { to: '/resources', icon: <FiBookOpen />, label: 'Resources' },
  { to: '/profile', icon: <FiUser />, label: 'Profile' },
]

const adminLinks = [
  { to: '/admin', icon: <FiShield />, label: 'Admin Dashboard' },
  { to: '/admin/resources', icon: <FiDatabase />, label: 'Resources' },
  { to: '/admin/users', icon: <FiUsers />, label: 'Users' },
]

const Sidebar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully')
    navigate('/')
  }

  return (
    <aside className="sidebar">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
        <NavLink to="/" className="sidebar__logo" style={{ marginBottom: 0 }}>
          <FiZap className="sidebar__logo-icon" />
          <span>SkillPath <span className="gradient-text">AI</span></span>
        </NavLink>
        <ThemeToggle />
      </div>

      <nav className="sidebar__nav">
        <span className="sidebar__section-label">Navigation</span>
        {navLinks.map(({ to, icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}>
            {icon} {label}
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <>
            <span className="sidebar__section-label">Admin</span>
            {adminLinks.map(({ to, icon, label }) => (
              <NavLink key={to} to={to} end className={({ isActive }) => `sidebar__link ${isActive ? 'active' : ''}`}>
                {icon} {label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <Avatar name={user?.name} size={36} />
          <div>
            <div className="sidebar__user-name">{user?.name}</div>
            <div className="sidebar__user-role">{user?.role}</div>
          </div>
        </div>
        <button onClick={handleLogout} className="sidebar__link" style={{ width: '100%', marginTop: 8, background: 'none', border: 'none', color: 'var(--color-error)', cursor: 'pointer' }}>
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
