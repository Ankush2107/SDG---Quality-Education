import Spinner from '../ui/Spinner'

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  isLoading = false,
  type = 'button',
  className = '',
}) => (
  <button
    type={type}
    className={`btn btn--${variant} btn--${size} ${className}`}
    onClick={onClick}
    disabled={disabled || isLoading}
  >
    {isLoading ? <Spinner size={16} /> : children}
  </button>
)

export default Button
