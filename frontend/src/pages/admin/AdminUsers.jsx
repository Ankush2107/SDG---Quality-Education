import { useState, useEffect } from 'react'
import { FiToggleLeft, FiToggleRight } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Avatar from '../../components/ui/Avatar'
import Badge from '../../components/ui/Badge'
import Spinner from '../../components/ui/Spinner'
import api from '../../utils/axios'
import { formatDate } from '../../utils/helpers'
import toast from 'react-hot-toast'

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [toggling, setToggling] = useState(null)

  const load = () => {
    setIsLoading(true)
    api.get('/admin/users').then(({ data }) => setUsers(data.users || [])).finally(() => setIsLoading(false))
  }
  useEffect(load, [])

  const handleToggle = async (userId, currentActive) => {
    setToggling(userId)
    try {
      await api.put(`/admin/users/${userId}`, { isActive: !currentActive })
      setUsers(prev => prev.map(u => u._id === userId ? { ...u, isActive: !currentActive } : u))
      toast.success(`User ${!currentActive ? 'activated' : 'deactivated'}`)
    } catch {
      toast.error('Failed to update user')
    } finally {
      setToggling(null)
    }
  }

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>Manage <span className="gradient-text">Users</span></h1>
          <p>View all registered users and manage their access.</p>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-16)' }}><Spinner size={48} /></div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead><tr>
                <th>User</th><th>Email</th><th>Role</th><th>Joined</th><th>Status</th><th>Action</th>
              </tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <Avatar name={u.name} size={32} />
                        <span style={{ fontWeight: 600 }}>{u.name}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{u.email}</td>
                    <td><Badge variant={u.role === 'admin' ? 'primary' : 'neutral'}>{u.role}</Badge></td>
                    <td style={{ color: 'var(--color-text-secondary)' }}>{formatDate(u.createdAt)}</td>
                    <td><Badge variant={u.isActive ? 'success' : 'error'}>{u.isActive ? 'Active' : 'Inactive'}</Badge></td>
                    <td>
                      <button
                        onClick={() => handleToggle(u._id, u.isActive)}
                        disabled={toggling === u._id}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: u.isActive ? 'var(--color-success)' : 'var(--color-text-muted)', fontSize: '1.5rem', transition: 'var(--transition)' }}
                        title={u.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {toggling === u._id ? '...' : u.isActive ? <FiToggleRight /> : <FiToggleLeft />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default AdminUsers
