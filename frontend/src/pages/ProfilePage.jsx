import { useState } from 'react'
import { FiUser, FiMail, FiSave, FiLock } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import InputField from '../components/ui/InputField'
import Button from '../components/ui/Button'
import Avatar from '../components/ui/Avatar'
import { useAuth } from '../context/AuthContext'
import api from '../utils/axios'
import toast from 'react-hot-toast'
import { formatDate } from '../utils/helpers'

const ProfilePage = () => {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({ name: user?.name || '' })
  const [passForm, setPassForm] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPass, setIsChangingPass] = useState(false)

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })
  const setP = (field) => (e) => setPassForm({ ...passForm, [field]: e.target.value })

  const handleSaveProfile = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) { toast.error('Name cannot be empty'); return }
    setIsSaving(true)
    try {
      const { data } = await api.put('/users/profile', { name: form.name })
      updateUser({ name: data.user.name })
      toast.success('Profile updated!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed')
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    if (passForm.newPassword.length < 6) { toast.error('New password must be at least 6 characters'); return }
    if (passForm.newPassword !== passForm.confirm) { toast.error('Passwords do not match'); return }
    setIsChangingPass(true)
    try {
      await api.put('/users/password', { currentPassword: passForm.currentPassword, newPassword: passForm.newPassword })
      toast.success('Password changed!')
      setPassForm({ currentPassword: '', newPassword: '', confirm: '' })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change failed')
    } finally {
      setIsChangingPass(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="animate-fade-up" style={{ maxWidth: 700 }}>
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>Your <span className="gradient-text">Profile</span></h1>
          <p>Manage your account information and settings.</p>
        </div>

        {/* Avatar section */}
        <div className="card" style={{ marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <Avatar name={user?.name} size={80} />
          <div>
            <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 4 }}>{user?.name}</h3>
            <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>{user?.email}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span className="badge badge--primary">{user?.role}</span>
              <span className="badge badge--neutral">Joined {formatDate(user?.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Update name */}
        <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
            <FiUser style={{ marginRight: 8 }} />Personal Information
          </h3>
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <InputField label="Full Name" id="name" value={form.name} onChange={set('name')} placeholder="Your full name" required />
            <div className="input-group">
              <label className="input-label"><FiMail style={{ marginRight: 6 }} />Email</label>
              <input className="input-field" value={user?.email} disabled style={{ opacity: 0.6, cursor: 'not-allowed' }} />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Email cannot be changed.</span>
            </div>
            <Button type="submit" variant="primary" isLoading={isSaving} style={{ alignSelf: 'flex-start' }}>
              <FiSave /> Save Changes
            </Button>
          </form>
        </div>

        {/* Change password */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-lg)' }}>
            <FiLock style={{ marginRight: 8 }} />Change Password
          </h3>
          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <InputField label="Current Password" id="curr-pass" type="password" value={passForm.currentPassword} onChange={setP('currentPassword')} placeholder="Enter current password" required />
            <InputField label="New Password" id="new-pass" type="password" value={passForm.newPassword} onChange={setP('newPassword')} placeholder="Min 6 characters" required />
            <InputField label="Confirm New Password" id="confirm-pass" type="password" value={passForm.confirm} onChange={setP('confirm')} placeholder="Repeat new password" required />
            <Button type="submit" variant="secondary" isLoading={isChangingPass} style={{ alignSelf: 'flex-start' }}>
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ProfilePage
