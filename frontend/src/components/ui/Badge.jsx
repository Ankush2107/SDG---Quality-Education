const Badge = ({ children, variant = 'neutral', icon }) => (
  <span className={`badge badge--${variant}`}>
    {icon && <span>{icon}</span>}
    {children}
  </span>
)

export default Badge
