import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiZap, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

const RegisterPage = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setIsLoading(true)
    try {
      await register(form.name.trim(), form.email, form.password)
      toast.success('Account created! Let\'s set up your learning path.')
      navigate('/onboarding')
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed'
      toast.error(msg)
      setErrors({ general: msg })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card animate-fade-up">
        <div className="auth-card__header">
          <div className="auth-card__logo">
            <FiZap /><span>SkillPath <span className="gradient-text">AI</span></span>
          </div>
          <h2 className="auth-card__title">Create Your Account</h2>
          <p className="auth-card__subtitle">Start your AI-powered learning journey today — free forever</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-error)' }}>
              {errors.general}
            </div>
          )}
          <InputField label="Full Name" id="name" value={form.name} onChange={set('name')} placeholder="Alex Johnson" error={errors.name} required />
          <InputField label="Email" id="email" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" error={errors.email} required autoComplete="email" />
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password <span style={{ color: 'var(--color-error)' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input id="password" type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')}
                placeholder="Min 6 characters" className={`input-field ${errors.password ? 'input-field--error' : ''}`} style={{ paddingRight: 44 }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <span className="input-error-msg">{errors.password}</span>}
          </div>
          <InputField label="Confirm Password" id="confirm" type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repeat password" error={errors.confirm} required />
          <Button type="submit" variant="primary" isLoading={isLoading} className="btn--full">
            Create Account — It's Free
          </Button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
