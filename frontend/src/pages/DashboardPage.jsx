import { Link } from 'react-router-dom'
import { FiMap, FiMessageSquare, FiFolder, FiBookOpen, FiArrowRight, FiRefreshCw } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import DashboardLayout from '../components/layout/DashboardLayout'
import ProgressRing from '../components/ui/ProgressRing'
import Spinner from '../components/ui/Spinner'
import useRoadmap from '../hooks/useRoadmap'
import { formatDate } from '../utils/helpers'

const StatCard = ({ icon, label, value, color = 'var(--color-primary)' }) => (
  <div className="stat-card">
    <div className="stat-card__icon" style={{ background: `${color}22`, color }}>{icon}</div>
    <div>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__label">{label}</div>
    </div>
  </div>
)

const DashboardPage = () => {
  const { user } = useAuth()
  const { roadmap, progress, isLoading } = useRoadmap()

  if (isLoading) return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <Spinner size={48} />
      </div>
    </DashboardLayout>
  )

  const pct = progress?.percentComplete || 0
  const completed = progress?.completedSteps?.length || 0
  const total = progress?.totalSteps || roadmap?.steps?.length || 0

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        {/* Welcome */}
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-1)' }}>
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
          </h1>
          <p>Here's your learning overview for today.</p>
        </div>

        {/* Stats row */}
        <div className="grid-4" style={{ marginBottom: 'var(--space-8)' }}>
          <StatCard icon="📈" label="Progress" value={`${Math.round(pct)}%`} color="#6C63FF" />
          <StatCard icon="✅" label="Steps Done" value={`${completed}/${total}`} color="#10B981" />
          <StatCard icon="🔥" label="Streak" value={`${progress?.streak || 0}d`} color="#F59E0B" />
          <StatCard icon="🎯" label="Goal" value={roadmap?.goal || 'Set Goal'} color="#00D4AA" />
        </div>

        <div className="grid-2" style={{ marginBottom: 'var(--space-8)' }}>
          {/* Progress ring card */}
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Overall Progress</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-8)' }}>
              <ProgressRing value={pct} size={140} />
              <div>
                <p style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>You've completed <strong style={{ color: 'var(--color-accent)' }}>{completed} topics</strong> out of {total}.</p>
                {roadmap && <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Goal: {roadmap.goal} · Level: {roadmap.level}</p>}
                <Link to="/roadmap" style={{ marginTop: 'var(--space-4)', display: 'inline-flex' }}>
                  <button className="btn btn--primary btn--sm">View Roadmap <FiArrowRight /></button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-6)' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {[
                { to: '/roadmap', icon: <FiMap />, label: 'Continue Roadmap', sub: 'Pick up where you left off', color: '#6C63FF' },
                { to: '/chat', icon: <FiMessageSquare />, label: 'Ask AI a Question', sub: 'Get instant doubt resolution', color: '#00D4AA' },
                { to: '/projects', icon: <FiFolder />, label: 'Find a Project', sub: 'Build something real', color: '#F59E0B' },
                { to: '/resources', icon: <FiBookOpen />, label: 'Browse Resources', sub: 'Curated learning materials', color: '#3B82F6' },
              ].map(({ to, icon, label, sub, color }) => (
                <Link key={to} to={to} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)', transition: 'var(--transition)', border: '1px solid transparent' }}
                  onMouseOver={e => { e.currentTarget.style.background = 'var(--color-bg-elevated)'; e.currentTarget.style.borderColor = 'var(--color-border)' }}
                  onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', background: `${color}22`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{label}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{sub}</div>
                  </div>
                  <FiArrowRight style={{ marginLeft: 'auto', color: 'var(--color-text-muted)' }} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Roadmap preview */}
        {roadmap?.steps && (
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }}>
              <h3>Your Roadmap — Next Steps</h3>
              <Link to="/roadmap"><button className="btn btn--ghost btn--sm">View All <FiArrowRight /></button></Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {roadmap.steps.slice(0, 4).map((step) => (
                <div key={step.stepNumber} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: step.completed ? 'rgba(16,185,129,0.15)' : 'var(--color-bg-card)', border: `2px solid ${step.completed ? '#10B981' : 'var(--color-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-xs)', fontWeight: 700, flexShrink: 0, color: step.completed ? '#10B981' : 'var(--color-text-secondary)' }}>
                    {step.completed ? '✓' : step.stepNumber}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', textDecoration: step.completed ? 'line-through' : 'none', color: step.completed ? 'var(--color-text-secondary)' : 'var(--color-text)' }}>{step.title}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{step.duration}</div>
                  </div>
                  <span className={`badge badge--${step.completed ? 'success' : 'neutral'}`}>{step.completed ? 'Done' : 'Pending'}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!roadmap && (
          <div className="card" style={{ textAlign: 'center', padding: 'var(--space-12)' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>🗺️</div>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>No Roadmap Yet</h3>
            <p style={{ marginBottom: 'var(--space-6)' }}>Complete onboarding to get your personalized AI roadmap.</p>
            <Link to="/onboarding"><button className="btn btn--primary">Generate My Roadmap ✨</button></Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default DashboardPage
