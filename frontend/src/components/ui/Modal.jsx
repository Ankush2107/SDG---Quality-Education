import { useEffect } from 'react'
import { FiX } from 'react-icons/fi'

const Modal = ({ isOpen, onClose, title, children, maxWidth = 520 }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" style={{ maxWidth }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
