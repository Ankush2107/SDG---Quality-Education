import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiZap, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email'
    if (!form.password) e.password = 'Password is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setIsLoading(true)
    try {
      const user = await login(form.email, form.password)
      toast.success(`Welcome back, ${user.name}!`)
      navigate(user.role === 'admin' ? '/admin' : '/dashboard')
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed'
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
          <h2 className="auth-card__title">Welcome Back</h2>
          <p className="auth-card__subtitle">Sign in to continue your learning journey</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {errors.general && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 'var(--radius-md)', padding: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--color-error)' }}>
              {errors.general}
            </div>
          )}
          <InputField
            label="Email" id="email" type="email"
            value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com" error={errors.email} required autoComplete="email"
          />
          <div className="input-group">
            <label htmlFor="password" className="input-label">Password <span style={{ color: 'var(--color-error)' }}>*</span></label>
            <div style={{ position: 'relative' }}>
              <input
                id="password" type={showPass ? 'text' : 'password'}
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="Your password" autoComplete="current-password"
                className={`input-field ${errors.password ? 'input-field--error' : ''}`}
                style={{ paddingRight: 44 }}
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}>
                {showPass ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {errors.password && <span className="input-error-msg">{errors.password}</span>}
          </div>
          <Button type="submit" variant="primary" isLoading={isLoading} className="btn--full">
            Sign In
          </Button>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account? <Link to="/register">Create one free</Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
