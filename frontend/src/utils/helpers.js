export const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric'
  })
}

export const truncate = (str, n = 100) => {
  if (!str) return ''
  return str.length > n ? str.slice(0, n) + '...' : str
}

export const getInitials = (name = '') => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export const getLevelColor = (level) => {
  const map = { beginner: 'success', intermediate: 'warning', advanced: 'error' }
  return map[level?.toLowerCase()] || 'neutral'
}

export const getTypeIcon = (type) => {
  const map = { video: '🎬', article: '📄', course: '🎓', documentation: '📚', tool: '🛠️' }
  return map[type] || '📌'
}

export const timeAgo = (dateString) => {
  if (!dateString) return ''
  const diff = Date.now() - new Date(dateString).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}
