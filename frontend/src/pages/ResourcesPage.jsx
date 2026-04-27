import { useState, useEffect } from 'react'
import { FiExternalLink } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import SearchBar from '../components/ui/SearchBar'
import FilterBar from '../components/ui/FilterBar'
import Badge from '../components/ui/Badge'
import Spinner from '../components/ui/Spinner'
import EmptyState from '../components/ui/EmptyState'
import api from '../utils/axios'
import { getTypeIcon } from '../utils/helpers'

const typeFilters = [
  { value: 'all', label: 'All' },
  { value: 'video', label: '🎬 Video' },
  { value: 'article', label: '📄 Article' },
  { value: 'course', label: '🎓 Course' },
  { value: 'documentation', label: '📚 Docs' },
  { value: 'tool', label: '🛠️ Tools' },
]

const typeVariant = { video: 'error', article: 'info', course: 'primary', documentation: 'accent', tool: 'warning' }

const ResourceCard = ({ resource }) => (
  <div className="card card--hover">
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
      <span style={{ fontSize: '1.4rem' }}>{getTypeIcon(resource.type)}</span>
      <Badge variant={typeVariant[resource.type] || 'neutral'}>{resource.type}</Badge>
    </div>
    <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>{resource.title}</h3>
    {resource.description && <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>{resource.description}</p>}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        <Badge variant="neutral">{resource.topic}</Badge>
        {resource.tags?.slice(0, 2).map(t => <Badge key={t} variant="neutral">{t}</Badge>)}
      </div>
      <a href={resource.url} target="_blank" rel="noopener noreferrer">
        <button className="btn btn--primary btn--sm"><FiExternalLink /> Visit</button>
      </a>
    </div>
  </div>
)

const ResourcesPage = () => {
  const [resources, setResources] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    api.get('/resources')
      .then(({ data }) => setResources(data.resources || []))
      .catch(() => {})
      .finally(() => setIsLoading(false))
  }, [])

  const filtered = resources.filter(r => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) || r.topic.toLowerCase().includes(search.toLowerCase())
    const matchType = filter === 'all' || r.type === filter
    return matchSearch && matchType
  })

  return (
    <DashboardLayout>
      <div className="animate-fade-up">
        <div style={{ marginBottom: 'var(--space-8)' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
            Resource <span className="gradient-text">Library</span>
          </h1>
          <p>Curated learning materials handpicked by our instructors.</p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-4)', marginBottom: 'var(--space-6)', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <SearchBar value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by title or topic..." />
          </div>
          <FilterBar options={typeFilters} active={filter} onChange={setFilter} />
        </div>

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-16)' }}><Spinner size={48} /></div>
        ) : filtered.length === 0 ? (
          <EmptyState icon="📚" title="No Resources Found" text="Try a different search or filter." />
        ) : (
          <div className="grid-3">
            {filtered.map(r => <ResourceCard key={r._id} resource={r} />)}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default ResourcesPage
