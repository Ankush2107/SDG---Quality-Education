import { FiSearch } from 'react-icons/fi'

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => (
  <div style={{ position: 'relative' }}>
    <FiSearch style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)', pointerEvents: 'none' }} />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input-field"
      style={{ paddingLeft: 40 }}
    />
  </div>
)

export default SearchBar
