import { Link } from 'react-router-dom'
import { FiZap, FiGithub, FiTwitter } from 'react-icons/fi'

const Footer = () => (
  <footer style={{
    background: 'var(--color-bg-secondary)',
    borderTop: '1px solid var(--color-border)',
    padding: 'var(--space-12) 0 var(--space-8)'
  }}>
    <div className="container">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-10)', marginBottom: 'var(--space-10)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 'var(--text-xl)', marginBottom: 'var(--space-3)' }}>
            <FiZap style={{ color: 'var(--color-primary)' }} />
            <span>SkillPath <span className="gradient-text">AI</span></span>
          </div>
          <p style={{ fontSize: 'var(--text-sm)' }}>AI-powered personalized learning for every student. Aligned with UN SDG 4 — Quality Education.</p>
        </div>
        <div>
          <h4 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Platform</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            {['/', '/about', '/login', '/register'].map((path, i) => (
              <li key={i}><Link to={path} style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', transition: 'var(--transition)' }}
                onMouseOver={e => e.target.style.color = 'var(--color-text)'}
                onMouseOut={e => e.target.style.color = 'var(--color-text-secondary)'}>
                {['Home', 'About', 'Login', 'Register'][i]}
              </Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>SDG 4</h4>
          <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>Quality Education — Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.</p>
        </div>
      </div>
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-4)' }}>
        <p style={{ fontSize: 'var(--text-sm)' }}>© 2025 SkillPath AI. Built with ❤️ for SDG 4.</p>
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          <a href="#" style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', transition: 'var(--transition)' }}><FiGithub /></a>
          <a href="#" style={{ color: 'var(--color-text-secondary)', fontSize: '1.2rem', transition: 'var(--transition)' }}><FiTwitter /></a>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
