import ChatHistory from '../models/ChatHistory.js';
import crypto from 'crypto';
import { chatWithAI } from '../services/aiService.js';

// @desc    Send a message to AI and get response
// @route   POST /api/chat
// @access  Private
export const handleChatMessage = async (req, res) => {
  const { message, sessionId } = req.body;

  if (!message) {
    res.status(400);
    throw new Error('Message is required');
  }

  let chatSession;
  let activeSessionId = sessionId;

  if (!activeSessionId) {
    activeSessionId = crypto.randomUUID();
    chatSession = await ChatHistory.create({
      user: req.user._id,
      sessionId: activeSessionId,
      messages: [{ role: 'assistant', content: "Hi! I'm SkillPath AI 🤖 Ask me anything about your learning journey!" }]
    });
  } else {
    chatSession = await ChatHistory.findOne({ sessionId: activeSessionId, user: req.user._id });
    if (!chatSession) {
      res.status(404);
      throw new Error('Chat session not found');
    }
  }

  // Add user message
  chatSession.messages.push({ role: 'user', content: message });
  
  // Call AI Service
  // We send the last 10 messages for context
  const contextMessages = chatSession.messages.slice(-10).map(m => ({ role: m.role, content: m.content }));
  const aiReplyContent = await chatWithAI(contextMessages);

  // Add AI response
  chatSession.messages.push({ role: 'assistant', content: aiReplyContent });
  await chatSession.save();

  res.json({
    reply: aiReplyContent,
    sessionId: activeSessionId
  });
};

// @desc    Get chat history sessions
// @route   GET /api/chat/history
// @access  Private
export const getChatHistory = async (req, res) => {
  const sessions = await ChatHistory.find({ user: req.user._id })
    .select('sessionId updatedAt')
    .sort({ updatedAt: -1 });

  res.json({ sessions });
};

// @desc    Get specific chat session
// @route   GET /api/chat/history/:id
// @access  Private
export const getChatSession = async (req, res) => {
  const session = await ChatHistory.findOne({ sessionId: req.params.id, user: req.user._id });
  if (session) {
    res.json({ session });
  } else {
    res.status(404);
    throw new Error('Session not found');
  }
};
