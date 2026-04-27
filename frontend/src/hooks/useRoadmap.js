import { useState, useEffect } from 'react'
import api from '../utils/axios'

const useRoadmap = () => {
  const [roadmap, setRoadmap] = useState(null)
  const [progress, setProgress] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRoadmap = async () => {
    try {
      setIsLoading(true)
      const [roadmapRes, progressRes] = await Promise.all([
        api.get('/roadmaps/me'),
        api.get('/progress/me'),
      ])
      setRoadmap(roadmapRes.data.roadmap)
      setProgress(progressRes.data.progress)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load roadmap')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { fetchRoadmap() }, [])

  const markStep = async (stepNumber, completed) => {
    try {
      const { data } = await api.put('/progress/step', { stepNumber, completed })
      setProgress(data.progress)
      return data.progress
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Failed to update step')
    }
  }

  const regenerate = async (goal, level, weeklyHours) => {
    const { data } = await api.post('/roadmaps/regenerate', { goal, level, weeklyHours })
    setRoadmap(data.roadmap)
    setProgress(null)
    return data.roadmap
  }

  const getLesson = async (topic, description) => {
    const { data } = await api.post('/learning/lesson', { topic, description })
    return data.lesson
  }

  const getQuiz = async (topic, description) => {
    const { data } = await api.post('/learning/quiz', { topic, description })
    return data.quiz
  }

  return { roadmap, progress, isLoading, error, markStep, regenerate, getLesson, getQuiz, refetch: fetchRoadmap }
}

export default useRoadmap
