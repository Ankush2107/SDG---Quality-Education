import { useState } from 'react'
import { FiX, FiCheckCircle, FiAlertCircle, FiArrowRight } from 'react-icons/fi'
import Button from '../ui/Button'

const QuizModal = ({ isOpen, onClose, topic, quiz, onPass }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  if (!isOpen) return null

  const currentQuestion = quiz[currentStep]

  const handleSelect = (index) => {
    if (isAnswered) return
    setSelectedOption(index)
  }

  const handleSubmit = () => {
    setIsAnswered(true)
    if (selectedOption === currentQuestion.correctIndex) {
      setScore(prev => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentStep < quiz.length - 1) {
      setCurrentStep(prev => prev + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  const handleFinish = () => {
    if (score >= quiz.length * 0.6) {
      onPass()
    }
    onClose()
    // Reset state for next time
    setTimeout(() => {
      setCurrentStep(0)
      setSelectedOption(null)
      setIsAnswered(false)
      setScore(0)
      setShowResult(false)
    }, 300)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box animate-fade-up" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{showResult ? 'Quiz Results' : `Quiz: ${topic}`}</h2>
          <button className="modal-close" onClick={onClose}><FiX /></button>
        </div>

        {!showResult ? (
          <div>
            <div style={{ marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
              Question {currentStep + 1} of {quiz.length}
            </div>
            
            <h3 style={{ marginBottom: 'var(--space-6)', lineHeight: 1.4 }}>{currentQuestion.question}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {currentQuestion.options.map((option, index) => {
                let className = 'quiz-option'
                if (selectedOption === index) className += ' quiz-option--selected'
                if (isAnswered) {
                  if (index === currentQuestion.correctIndex) className += ' quiz-option--correct'
                  else if (selectedOption === index) className += ' quiz-option--wrong'
                }

                return (
                  <button
                    key={index}
                    className={className}
                    onClick={() => handleSelect(index)}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                )
              })}
            </div>

            {isAnswered && (
              <div className={`quiz-feedback ${selectedOption === currentQuestion.correctIndex ? 'quiz-feedback--success' : 'quiz-feedback--error'}`}>
                <div style={{ fontWeight: 700, marginBottom: 'var(--space-1)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {selectedOption === currentQuestion.correctIndex ? <><FiCheckCircle /> Correct!</> : <><FiAlertCircle /> Incorrect</>}
                </div>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}

            <div style={{ marginTop: 'var(--space-8)', display: 'flex', justifyContent: 'flex-end' }}>
              {!isAnswered ? (
                <Button variant="primary" disabled={selectedOption === null} onClick={handleSubmit}>Check Answer</Button>
              ) : (
                <Button variant="primary" onClick={handleNext}>
                  {currentStep === quiz.length - 1 ? 'See Results' : 'Next Question'} <FiArrowRight />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>
              {score >= quiz.length * 0.6 ? '🎉' : '📚'}
            </div>
            <h3>{score >= quiz.length * 0.6 ? 'Congratulations!' : 'Good Effort!'}</h3>
            <p style={{ margin: 'var(--space-4) 0 var(--space-8)' }}>
              You scored {score} out of {quiz.length} correctly.
              {score >= quiz.length * 0.6 ? " You've mastered this topic!" : " Try reviewing the lesson and taking the quiz again."}
            </p>
            <Button variant="primary" size="lg" onClick={handleFinish}>
              {score >= quiz.length * 0.6 ? 'Complete Step' : 'Back to Roadmap'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QuizModal
