const FeatureCard = ({ icon, title, description, color = 'var(--color-primary)' }) => (
  <div className="card card--hover" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
    <div style={{
      width: 64, height: 64, borderRadius: 'var(--radius-lg)',
      background: `${color}22`, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto var(--space-5)',
      border: `1px solid ${color}44`,
    }}>
      {icon}
    </div>
    <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-3)' }}>{title}</h3>
    <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>{description}</p>
  </div>
)

export default FeatureCard
