import { useState, useRef, useEffect } from 'react'
import { FiSend, FiPlus } from 'react-icons/fi'
import DashboardLayout from '../components/layout/DashboardLayout'
import useChat from '../hooks/useChat'

const TypingIndicator = () => (
  <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '12px 16px', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-lg)', width: 64, borderBottomLeftRadius: 4 }}>
    {[0, 1, 2].map(i => (
      <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-primary)', animation: `bounce 1s ${i * 0.2}s infinite ease-in-out` }} />
    ))}
    <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
  </div>
)

const ChatPage = () => {
  const { messages, isTyping, sendMessage, newChat } = useChat()
  const [input, setInput] = useState('')
  const bottomRef = useRef()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleSend = async () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    await sendMessage(text)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <DashboardLayout>
      <div style={{ height: 'calc(100vh - 80px)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div>
            <h1 style={{ fontSize: 'var(--text-2xl)', marginBottom: 4 }}>AI Doubt <span className="gradient-text">Assistant</span></h1>
            <p style={{ fontSize: 'var(--text-sm)' }}>Ask anything about your learning journey — available 24/7</p>
          </div>
          <button className="btn btn--secondary btn--sm" onClick={newChat}><FiPlus /> New Chat</button>
        </div>

        <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 0 }}>
          {/* Messages area */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', maxWidth: '80%', alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: msg.role === 'user' ? 'var(--color-accent)' : 'var(--color-primary-glow)', border: `2px solid ${msg.role === 'user' ? 'var(--color-accent)' : 'var(--color-primary)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--text-sm)', fontWeight: 700, flexShrink: 0, color: msg.role === 'user' ? '#0F0F1A' : 'var(--color-primary-light)' }}>
                  {msg.role === 'user' ? 'U' : '🤖'}
                </div>
                <div style={{ padding: '12px 16px', borderRadius: 'var(--radius-lg)', fontSize: 'var(--text-sm)', lineHeight: 1.7, whiteSpace: 'pre-wrap', background: msg.role === 'user' ? 'var(--color-primary)' : 'var(--color-bg-elevated)', border: `1px solid ${msg.role === 'user' ? 'transparent' : 'var(--color-border)'}`, color: msg.role === 'user' ? '#fff' : 'var(--color-text)', borderBottomRightRadius: msg.role === 'user' ? 4 : 'var(--radius-lg)', borderBottomLeftRadius: msg.role === 'assistant' ? 4 : 'var(--radius-lg)' }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', gap: 'var(--space-3)', alignSelf: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--color-primary-glow)', border: '2px solid var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🤖</div>
                <TypingIndicator />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input area */}
          <div style={{ padding: 'var(--space-4) var(--space-6)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-end', flexShrink: 0 }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything about your learning journey..."
              rows={1}
              className="chat-input"
              style={{ flex: 1 }}
              onInput={e => { e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px' }}
            />
            <button className="btn btn--primary" onClick={handleSend} disabled={!input.trim()} style={{ flexShrink: 0, height: 44 }}>
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ChatPage
