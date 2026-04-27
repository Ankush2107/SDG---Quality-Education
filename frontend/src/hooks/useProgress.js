import { useState, useEffect } from 'react'
import api from '../utils/axios'

const useProgress = () => {
  const [progress, setProgress] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    api.get('/progress/me')
      .then(({ data }) => setProgress(data.progress))
      .catch(() => setProgress(null))
      .finally(() => setIsLoading(false))
  }, [])

  return { progress, isLoading }
}

export default useProgress
