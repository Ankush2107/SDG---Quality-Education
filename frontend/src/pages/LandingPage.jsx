import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/landing/HeroSection'
import FeatureCard from '../components/landing/FeatureCard'
import TestimonialSection from '../components/landing/TestimonialSection'
import CTABanner from '../components/landing/CTABanner'

const features = [
  { icon: '🗺️', title: 'AI Roadmap Generator', description: 'Enter your goal and skill level — get a step-by-step personalized learning roadmap powered by Groq AI in seconds.', color: '#6C63FF' },
  { icon: '🤖', title: 'AI Doubt Assistant', description: '24/7 AI chat mentor that answers your questions, explains concepts, and helps you stay unstuck at any hour.', color: '#00D4AA' },
  { icon: '🚀', title: 'Project Ideas', description: 'Get AI-curated project ideas matched to your exact skill level and learning stage. Build a real portfolio.', color: '#F59E0B' },
  { icon: '📊', title: 'Progress Tracking', description: 'Visual dashboards, completion rings, and streak tracking to keep you motivated on your learning journey.', color: '#3B82F6' },
]

const LandingPage = () => (
  <div>
    <Navbar />
    <main>
      <HeroSection />

      <section className="section">
        <div className="container">
          <h2 className="section-title">Everything You Need to <span className="gradient-text">Learn & Grow</span></h2>
          <p className="section-subtitle">SkillPath AI combines AI intelligence with structured learning to give every student a personalized mentor experience.</p>
          <div className="grid-4">
            {features.map(f => <FeatureCard key={f.title} {...f} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">From zero to deployed in 4 simple steps.</p>
          <div className="grid-4">
            {[
              { step: '01', title: 'Set Your Goal', desc: 'Choose what you want to learn — Web Dev, Data Science, ML, and more.' },
              { step: '02', title: 'Get Your Roadmap', desc: 'AI generates your personalized step-by-step learning plan instantly.' },
              { step: '03', title: 'Learn & Build', desc: 'Follow the roadmap, chat with AI for doubts, and build real projects.' },
              { step: '04', title: 'Track Progress', desc: 'Check off topics, view your progress ring, and celebrate milestones.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 'var(--space-3)' }}>{step}</div>
                <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>{title}</h3>
                <p style={{ fontSize: 'var(--text-sm)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />
      <CTABanner />
    </main>
    <Footer />
  </div>
)

export default LandingPage
