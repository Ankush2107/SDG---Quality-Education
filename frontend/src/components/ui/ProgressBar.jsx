const ProgressBar = ({ value = 0, height = 8, showLabel = false, color }) => (
  <div>
    {showLabel && (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 'var(--text-sm)', fontWeight: 600 }}>
        <span>Progress</span>
        <span style={{ color: 'var(--color-accent)' }}>{Math.round(value)}%</span>
      </div>
    )}
    <div className="progress-bar-wrap" style={{ height }}>
      <div
        className="progress-bar-fill"
        style={{ width: `${Math.min(value, 100)}%`, height: '100%', background: color }}
      />
    </div>
  </div>
)

export default ProgressBar
