import { useState, useEffect } from 'react'
import { FiPlus, FiEdit2, FiTrash2, FiExternalLink } from 'react-icons/fi'
import DashboardLayout from '../../components/layout/DashboardLayout'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import InputField from '../../components/ui/InputField'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'
import api from '../../utils/axios'
import toast from 'react-hot-toast'

const emptyForm = { title: '', url: '', topic: '', type: 'article', description: '' }
const typeOptions = ['article', 'video', 'course', 'documentation', 'tool']
const typeVariant = { video: 'error', article: 'info', course: 'primary', documentation: 'accent', tool: 'warning' }

const AdminResources = () => {
  const [resources, setResources] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [isSaving, setIsSaving] = useState(false)

  const load = () => {
    setIsLoading(true)
    api.get('/resources').then(({ data }) => setResources(data.resources || [])).finally(() => setIsLoading(false))
  }
  useEffect(load, [])

  const openAdd = () => { setForm(emptyForm); setEditing(null); setModal(true) }
  const openEdit = (r) => { setForm({ title: r.title, url: r.url, topic: r.topic, type: r.type, description: r.description || '' }); setEditing(r._id); setModal(true) }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!form.title || !form.url || !form.topic) { toast.error('Title, URL and Topic are required'); return }
    setIsSaving(true)
    try {
      if (editing) {
        await api.put(`/admin/resources/${editing}`, form)
        toast.success('Resource updated!')
      } else {
        await api.post('/admin/resources', form)
        toast.success('Resource added!')
      }
      setModal(false)
      load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this resource?')) return
    try {
      await api.delete(`/admin/resources/${id}`)
      toast.success('Resource deleted')
      load()
    } catch {
      toast.error('Delete failed')
    }
  }

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-8)' }}>
          <div>
            <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>Manage <span className="gradient-text">Resources</span></h1>
            <p>Add, edit, and remove learning resources from the library.</p>
          </div>
          <Button variant="primary" onClick={openAdd}><FiPlus /> Add Resource</Button>
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-16)' }}><Spinner size={48} /></div>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead><tr>
                <th>Title</th><th>Topic</th><th>Type</th><th>URL</th><th>Actions</th>
              </tr></thead>
              <tbody>
                {resources.map(r => (
                  <tr key={r._id}>
                    <td style={{ fontWeight: 600, maxWidth: 200 }}>{r.title}</td>
                    <td>{r.topic}</td>
                    <td><Badge variant={typeVariant[r.type] || 'neutral'}>{r.type}</Badge></td>
                    <td>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--text-sm)' }}>
                        <FiExternalLink /> Link
                      </a>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button className="btn btn--ghost btn--sm" onClick={() => openEdit(r)}><FiEdit2 /></button>
                        <button className="btn btn--danger btn--sm" onClick={() => handleDelete(r._id)}><FiTrash2 /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal isOpen={modal} onClose={() => setModal(false)} title={editing ? 'Edit Resource' : 'Add New Resource'}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <InputField label="Title" id="r-title" value={form.title} onChange={set('title')} placeholder="Resource title" required />
          <InputField label="URL" id="r-url" type="url" value={form.url} onChange={set('url')} placeholder="https://..." required />
          <InputField label="Topic" id="r-topic" value={form.topic} onChange={set('topic')} placeholder="e.g. React, MongoDB" required />
          <div className="input-group">
            <label className="input-label">Type</label>
            <select className="input-field" value={form.type} onChange={set('type')}>
              {typeOptions.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <InputField label="Description (optional)" id="r-desc" value={form.description} onChange={set('description')} placeholder="Brief description..." />
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setModal(false)} type="button">Cancel</Button>
            <Button variant="primary" type="submit" isLoading={isSaving}>{editing ? 'Update' : 'Add Resource'}</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}

export default AdminResources
