const testimonials = [
  { name: 'Priya Sharma', role: 'Web Developer', text: 'SkillPath AI gave me a clear roadmap when I was completely lost. The AI chat answered every doubt I had at 2 AM!', avatar: 'PS' },
  { name: 'Arjun Mehta', role: 'CS Student', text: 'I generated my roadmap and built 3 projects following it. Got my first internship within 4 months!', avatar: 'AM' },
  { name: 'Fatima Khan', role: 'Career Switcher', text: 'Switched from marketing to data science using this platform. The personalized plan made all the difference.', avatar: 'FK' },
]

const TestimonialSection = () => (
  <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
    <div className="container">
      <h2 className="section-title">What Students Say</h2>
      <p className="section-subtitle">Real results from real learners on their journey to becoming developers.</p>
      <div className="grid-3">
        {testimonials.map((t) => (
          <div key={t.name} className="card" style={{ position: 'relative' }}>
            <div style={{ fontSize: '2rem', color: 'var(--color-primary)', marginBottom: 'var(--space-4)', opacity: 0.5 }}>"</div>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 1.8, marginBottom: 'var(--space-6)', fontStyle: 'italic' }}>{t.text}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--color-primary-glow)', border: '2px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-primary-light)' }}>{t.avatar}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 'var(--text-sm)' }}>{t.name}</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default TestimonialSection
