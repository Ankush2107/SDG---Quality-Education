import { getInitials } from '../../utils/helpers'

const Avatar = ({ name = '', size = 40, src }) => {
  const initials = getInitials(name)
  const colors = ['#6C63FF', '#00D4AA', '#F59E0B', '#EF4444', '#3B82F6']
  const color = colors[name.charCodeAt(0) % colors.length] || colors[0]

  if (src) return (
    <img src={src} alt={name} style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }} />
  )

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `${color}33`, border: `2px solid ${color}66`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.35, fontWeight: 700, color, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

export default Avatar
