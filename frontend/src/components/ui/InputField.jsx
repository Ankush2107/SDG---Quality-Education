const InputField = ({
  label, id, type = 'text', value, onChange,
  placeholder, error, required = false, autoComplete
}) => (
  <div className="input-group">
    {label && (
      <label htmlFor={id} className="input-label">
        {label} {required && <span style={{ color: 'var(--color-error)' }}>*</span>}
      </label>
    )}
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className={`input-field ${error ? 'input-field--error' : ''}`}
    />
    {error && <span className="input-error-msg">{error}</span>}
  </div>
)

export default InputField
