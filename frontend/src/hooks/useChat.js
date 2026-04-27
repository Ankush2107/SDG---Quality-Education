import { useState, useRef } from 'react'
import api from '../utils/axios'

const useChat = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm SkillPath AI 🤖 Ask me anything about your learning journey, concepts, or projects!" }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const [sessions, setSessions] = useState([])

  const sendMessage = async (content) => {
    const userMsg = { role: 'user', content, timestamp: new Date() }
    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)
    try {
      const { data } = await api.post('/chat', { message: content, sessionId })
      const aiMsg = { role: 'assistant', content: data.reply, timestamp: new Date() }
      setMessages(prev => [...prev, aiMsg])
      if (data.sessionId && !sessionId) setSessionId(data.sessionId)
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again in a moment! 🙏"
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const loadSessions = async () => {
    try {
      const { data } = await api.get('/chat/history')
      setSessions(data.sessions)
    } catch {}
  }

  const loadSession = async (id) => {
    try {
      const { data } = await api.get(`/chat/history/${id}`)
      setMessages(data.session.messages)
      setSessionId(id)
    } catch {}
  }

  const newChat = () => {
    setMessages([{ role: 'assistant', content: "Hi! I'm SkillPath AI 🤖 Ask me anything about your learning journey!" }])
    setSessionId(null)
  }

  return { messages, isTyping, sessions, sendMessage, loadSessions, loadSession, newChat }
}

export default useChat
