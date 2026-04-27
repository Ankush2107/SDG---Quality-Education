import { Link } from 'react-router-dom'
import { FiArrowRight, FiZap } from 'react-icons/fi'

const HeroSection = () => (
  <section style={{
    minHeight: '90vh', display: 'flex', alignItems: 'center',
    padding: 'var(--space-20) 0',
    background: 'radial-gradient(ellipse at 60% 0%, rgba(108,99,255,0.15) 0%, transparent 60%)',
    position: 'relative', overflow: 'hidden',
  }}>
    {/* Decorative blobs */}
    <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)', bottom: -100, left: -100, pointerEvents: 'none' }} />

    <div className="container" style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
        <div className="animate-fade-up">

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: 'var(--space-6)', lineHeight: 1.1 }}>
            Learn Smarter with <span className="gradient-text">AI-Powered</span> Roadmaps
          </h1>

          <p style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-8)', maxWidth: 480, lineHeight: 1.8 }}>
            Get a personalized learning roadmap built by AI, chat with your AI mentor 24/7, discover real project ideas, and track every step of your progress.
          </p>

          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <Link to="/register">
              <button className="btn btn--primary btn--lg" style={{ fontSize: 'var(--text-base)' }}>
                Start Learning Free <FiArrowRight />
              </button>
            </Link>
            <Link to="/about">
              <button className="btn btn--secondary btn--lg">
                Learn More
              </button>
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-8)', marginTop: 'var(--space-10)', flexWrap: 'wrap' }}>
            {[['10K+', 'Students'], ['500+', 'Roadmaps'], ['98%', 'Satisfaction']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-accent)' }}>{num}</div>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 380, height: 380,
            background: 'radial-gradient(circle at 50% 50%, rgba(108,99,255,0.2) 0%, transparent 70%)',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'float 4s ease-in-out infinite',
          }}>
            <div style={{
              background: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-strong)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-6)',
              width: 300,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px var(--color-primary-glow)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-4)' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', marginBottom: 8 }}>AI Roadmap Generated ✨</div>
              {['HTML & CSS Basics', 'JavaScript Core', 'React Fundamentals', 'Node.js & Express', 'MongoDB & Deploy'].map((step, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: i < 4 ? '1px solid var(--color-border)' : 'none' }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: i < 2 ? 'rgba(16,185,129,0.2)' : 'var(--color-bg-elevated)', border: `1px solid ${i < 2 ? '#10B981' : 'var(--color-border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, flexShrink: 0 }}>
                    {i < 2 ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', color: i < 2 ? 'var(--color-text-secondary)' : 'var(--color-text)', textDecoration: i < 2 ? 'line-through' : 'none' }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

export default HeroSection
