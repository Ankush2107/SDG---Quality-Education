import ReactMarkdown from 'react-markdown'
import { FiX } from 'react-icons/fi'
import Button from '../ui/Button'

const LessonModal = ({ isOpen, onClose, topic, lesson }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box animate-fade-up" style={{ maxWidth: '700px' }} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Learn: {topic}</h2>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>
        
        <div className="lesson-content" style={{ maxHeight: '60vh', overflowY: 'auto', paddingRight: 'var(--space-2)' }}>
          <ReactMarkdown>{lesson}</ReactMarkdown>
        </div>

        <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" onClick={onClose}>Got it!</Button>
        </div>
      </div>
    </div>
  )
}

export default LessonModal
