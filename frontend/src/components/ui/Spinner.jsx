const Spinner = ({ size = 24, color }) => (
  <div
    className="spinner"
    style={{
      width: size,
      height: size,
      borderTopColor: color || 'var(--color-primary)',
    }}
  />
)

export default Spinner
