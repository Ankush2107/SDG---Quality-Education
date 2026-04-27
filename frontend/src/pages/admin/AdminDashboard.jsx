import { useState, useEffect } from 'react'
import { FiUsers, FiMap, FiMessageSquare, FiBookOpen } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Spinner from '../../components/ui/Spinner'
import api from '../../utils/axios'

const StatCard = ({ icon, label, value, color }) => (
  <div className="stat-card">
    <div className="stat-card__icon" style={{ background: `${color}22`, color, fontSize: '1.4rem' }}>{icon}</div>
    <div>
      <div className="stat-card__value">{value ?? '—'}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  </div>
)

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/stats')
      .then(({ data }) => setStats(data.stats))
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p>Platform overview and management tools.</p>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-16)' }}><Spinner size={48} /></div>
        ) : (
          <div className="grid-4" style={{ marginBottom: 'var(--space-8)' }}>
            <StatCard icon={<FiUsers />} label="Total Users" value={stats?.totalUsers} color="#6C63FF" />
            <StatCard icon={<FiMap />} label="Active Roadmaps" value={stats?.activeRoadmaps} color="#00D4AA" />
            <StatCard icon={<FiMessageSquare />} label="Chat Sessions" value={stats?.totalChats} color="#F59E0B" />
            <StatCard icon={<FiBookOpen />} label="Resources" value={stats?.totalResources} color="#3B82F6" />
          </div>
        )}

        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Links</h3>
          <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            <a href="/admin/resources"><button className="btn btn--secondary">Manage Resources</button></a>
            <a href="/admin/users"><button className="btn btn--secondary">Manage Users</button></a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default AdminDashboard
