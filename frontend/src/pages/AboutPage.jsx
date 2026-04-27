import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'

const AboutPage = () => (
  <div>
    <Navbar />
    <main>
      <section style={{ padding: 'var(--space-20) 0', background: 'radial-gradient(ellipse at 50% 0%, rgba(108,99,255,0.1) 0%, transparent 60%)' }}>
        <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', background: 'rgba(0,212,170,0.1)', borderRadius: 'var(--radius-full)', marginBottom: 'var(--space-6)', border: '1px solid rgba(0,212,170,0.3)' }}>
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-accent)' }}>🌍 UN Sustainable Development Goal #4</span>
          </div>
          <h1 style={{ marginBottom: 'var(--space-6)' }}>About <span className="gradient-text">SkillPath AI</span></h1>
          <p style={{ fontSize: 'var(--text-lg)', lineHeight: 1.8, marginBottom: 'var(--space-8)' }}>
            SkillPath AI was built to solve a real problem: millions of students want to learn technology skills, but have no structured, personalized guidance. We bridge that gap using AI.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div>
              <h2 style={{ marginBottom: 'var(--space-4)' }}>Our Mission</h2>
              <p style={{ lineHeight: 1.9, marginBottom: 'var(--space-6)' }}>
                We believe every student deserves access to quality, personalized education — regardless of their background or financial situation. SkillPath AI acts as an AI mentor that adapts to each learner's unique goals and pace.
              </p>
              <h2 style={{ marginBottom: 'var(--space-4)' }}>SDG 4 Alignment</h2>
              <p style={{ lineHeight: 1.9 }}>
                Our platform directly supports <strong style={{ color: 'var(--color-accent)' }}>UN SDG 4 — Quality Education</strong>: ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all. We focus specifically on Target 4.4 (digital and employable skills) and Target 4.b (expanding access to learning opportunities).
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                { emoji: '🎯', title: 'Personalized', desc: 'Every student gets a unique roadmap built for their goal and current level.' },
                { emoji: '🤖', title: 'AI-Powered', desc: 'Groq LLaMA3 AI generates roadmaps, answers doubts, and recommends projects.' },
                { emoji: '📈', title: 'Progress-Driven', desc: 'Visual tracking keeps learners motivated and accountable.' },
                { emoji: '🆓', title: 'Free & Open', desc: 'Core features are free. Education should not have a paywall.' },
              ].map(({ emoji, title, desc }) => (
                <div key={title} className="card" style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
                    <p style={{ fontSize: 'var(--text-sm)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 'var(--space-16)', padding: 'var(--space-10)', background: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
            <h2 style={{ marginBottom: 'var(--space-4)' }}>Tech Stack</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center' }}>
              {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Groq AI', 'JWT Auth', 'Vercel', 'Render'].map(tech => (
                <span key={tech} className="badge badge--primary" style={{ padding: '8px 16px', fontSize: 'var(--text-sm)' }}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
    <Footer />
  </div>
)

export default AboutPage
