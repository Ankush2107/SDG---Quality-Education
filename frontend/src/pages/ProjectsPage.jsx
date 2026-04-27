import { useState, useEffect } from 'react'
import { FiBookmark, FiZap } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import FilterBar from '../components/ui/FilterBar'
import api from '../utils/axios'
import toast from 'react-hot-toast'

const difficultyVariant = { beginner: 'success', intermediate: 'warning', advanced: 'error' }

const ProjectCard = ({ project, onSave }) => (
  <div className="card card--hover" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Badge variant={difficultyVariant[project.difficulty] || 'neutral'}>{project.difficulty}</Badge>
      <button onClick={() => onSave(project)} className="btn btn--ghost btn--sm"><FiBookmark /></button>
    </div>
    <h3 style={{ fontSize: 'var(--text-base)' }}>{project.title}</h3>
    <p style={{ fontSize: 'var(--text-sm)', flex: 1 }}>{project.description}</p>
    {project.techStack?.length > 0 && (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.techStack.map(t => <span key={t} className="badge badge--info">{t}</span>)}
      </div>
    )}
    {project.estimatedTime && (
      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>⏱ {project.estimatedTime}</div>
    )}
  </div>
)

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
]

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/projects/recommendations')
      .then(({ data }) => setProjects(data.projects || []))
      .catch(() => toast.error('Failed to load projects'))
      .finally(() => setIsLoading(false))
  }, [])

  const handleSave = async (project) => {
    try {
      await api.post('/projects/save', project)
      toast.success('Project saved!')
    } catch {
      toast.error('Could not save project')
    }
  }

  const filtered = filter === 'all' ? projects : projects.filter(p => p.difficulty === filter)

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
            Project <span className="gradient-text">Ideas</span>
          </h1>
          <p>AI-recommended projects matched to your skill level. Build a real portfolio.</p>
        </div>

        <div style={{ marginBottom: 'var(--space-6)' }}>
          <FilterBar options={filterOptions} active={filter} onChange={setFilter} />
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-16)' }}>
            <div style={{ textAlign: 'center' }}>
              <Spinner size={48} />
              <p style={{ marginTop: 'var(--space-4)', color: 'var(--color-text-secondary)' }}>
                <FiZap style={{ color: 'var(--color-primary)' }} /> AI is generating project ideas for you...
              </p>
            </div>
          </div>
        ) : (
          <div className="grid-3">
            {filtered.map((p, i) => <ProjectCard key={i} project={p} onSave={handleSave} />)}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ProjectsPage
