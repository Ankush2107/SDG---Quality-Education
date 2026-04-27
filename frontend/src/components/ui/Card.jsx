const Card = ({ children, className = '', hover = false, glass = false, style = {} }) => (
  <div
    className={`card ${hover ? 'card--hover' : ''} ${glass ? 'card--glass' : ''} ${className}`}
    style={style}
  >
    {children}
  </div>
)

export default Card
