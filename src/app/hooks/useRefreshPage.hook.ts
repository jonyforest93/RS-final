import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

type RefreshPageFunc = () => void

export const useRefreshPage = (): RefreshPageFunc => {
  const navigate = useNavigate()

  return useCallback(() => {
    navigate(0)
  }, [navigate])
}
