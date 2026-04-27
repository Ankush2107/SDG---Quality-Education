import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiZap, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import api from '../utils/axios'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

const goals = ['Web Development', 'Data Science', 'Machine Learning', 'Mobile Development', 'DevOps & Cloud', 'UI/UX Design', 'Cybersecurity', 'Blockchain']
const levels = [
  { value: 'beginner', label: 'Beginner', desc: 'Just starting out — little to no experience', emoji: '🌱' },
  { value: 'intermediate', label: 'Intermediate', desc: 'Have some basics — want to go deeper', emoji: '🚀' },
  { value: 'advanced', label: 'Advanced', desc: 'Solid foundation — want to master advanced topics', emoji: '⚡' },
]
const timeOptions = [
  { value: 2, label: '2 hrs/week', desc: 'Casual pace — slow and steady', emoji: '☕' },
  { value: 5, label: '5 hrs/week', desc: 'Moderate pace — balanced approach', emoji: '📚' },
  { value: 10, label: '10+ hrs/week', desc: 'Intensive — fast-track your learning', emoji: '🔥' },
]

const StepIndicator = ({ current, total }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 'var(--space-8)' }}>
    {Array.from({ length: total }).map((_, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: i < current ? 'var(--color-primary)' : i === current ? 'var(--color-primary-glow)' : 'var(--color-bg-elevated)',
          border: `2px solid ${i <= current ? 'var(--color-primary)' : 'var(--color-border)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 'var(--text-sm)', fontWeight: 700,
          color: i < current ? '#fff' : i === current ? 'var(--color-primary-light)' : 'var(--color-text-muted)',
          transition: 'var(--transition)',
        }}>
          {i < current ? '✓' : i + 1}
        </div>
        {i < total - 1 && <div style={{ width: 40, height: 2, background: i < current ? 'var(--color-primary)' : 'var(--color-border)', transition: 'var(--transition)' }} />}
      </div>
    ))}
  </div>
)

const OnboardingPage = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({ learningGoal: '', currentLevel: '', weeklyHours: '' })
  const [isLoading, setIsLoading] = useState(false)

  const isStepValid = () => {
    if (step === 0) return !!form.learningGoal
    if (step === 1) return !!form.currentLevel
    if (step === 2) return !!form.weeklyHours
    return true
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await api.post('/profiles', form)
      toast.success('🎉 Your personalized roadmap has been generated!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)' }}>
      <div style={{ width: '100%', maxWidth: 640 }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 800, fontSize: 'var(--text-xl)', marginBottom: 'var(--space-4)' }}>
            <FiZap style={{ color: 'var(--color-primary)' }} />
            <span>SkillPath <span className="gradient-text">AI</span></span>
          </div>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>Let's Build Your Learning Path</h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>Answer 3 quick questions — our AI will create your personalized roadmap instantly.</p>
        </div>

        <div className="card" style={{ padding: 'var(--space-8)' }}>
          <StepIndicator current={step} total={3} />

          {step === 0 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>What do you want to learn?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>Choose your primary learning goal.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
                {goals.map(goal => (
                  <button key={goal} onClick={() => setForm({ ...form, learningGoal: goal })}
                    style={{
                      padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', textAlign: 'left',
                      background: form.learningGoal === goal ? 'var(--color-primary-glow)' : 'var(--color-bg-elevated)',
                      border: `1px solid ${form.learningGoal === goal ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      color: form.learningGoal === goal ? 'var(--color-primary-light)' : 'var(--color-text)',
                      fontWeight: 600, fontSize: 'var(--text-sm)', cursor: 'pointer',
                      transition: 'var(--transition)', fontFamily: 'inherit',
                    }}>
                    {goal}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>What's your current level?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>Be honest — the AI will tailor your roadmap accordingly.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {levels.map(({ value, label, desc, emoji }) => (
                  <button key={value} onClick={() => setForm({ ...form, currentLevel: value })}
                    style={{
                      padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', textAlign: 'left',
                      background: form.currentLevel === value ? 'var(--color-primary-glow)' : 'var(--color-bg-elevated)',
                      border: `1px solid ${form.currentLevel === value ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      color: 'var(--color-text)', cursor: 'pointer', transition: 'var(--transition)',
                      display: 'flex', alignItems: 'center', gap: 'var(--space-4)', fontFamily: 'inherit',
                    }}>
                    <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: form.currentLevel === value ? 'var(--color-primary-light)' : 'var(--color-text)' }}>{label}</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>How much time can you dedicate?</h2>
              <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>This helps us set realistic timelines in your roadmap.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {timeOptions.map(({ value, label, desc, emoji }) => (
                  <button key={value} onClick={() => setForm({ ...form, weeklyHours: value })}
                    style={{
                      padding: 'var(--space-5)', borderRadius: 'var(--radius-md)', textAlign: 'left',
                      background: form.weeklyHours === value ? 'var(--color-primary-glow)' : 'var(--color-bg-elevated)',
                      border: `1px solid ${form.weeklyHours === value ? 'var(--color-primary)' : 'var(--color-border)'}`,
                      color: 'var(--color-text)', cursor: 'pointer', transition: 'var(--transition)',
                      display: 'flex', alignItems: 'center', gap: 'var(--space-4)', fontFamily: 'inherit',
                    }}>
                    <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 'var(--text-base)', color: form.weeklyHours === value ? 'var(--color-primary-light)' : 'var(--color-text)' }}>{label}</div>
                      <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-8)', gap: 'var(--space-3)' }}>
            {step > 0 && <Button variant="secondary" onClick={() => setStep(step - 1)}><FiArrowLeft /> Back</Button>}
            <div style={{ marginLeft: 'auto' }}>
              {step < 2
                ? <Button variant="primary" onClick={() => setStep(step + 1)} disabled={!isStepValid()}>Next <FiArrowRight /></Button>
                : <Button variant="accent" onClick={handleSubmit} disabled={!isStepValid()} isLoading={isLoading}>✨ Generate My Roadmap</Button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
