import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUser } from 'api/getUser'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { Profile } from './Profile-page'

import type { Customer } from '@commercetools/platform-sdk'

export const ProfileWrapper: React.FC = () => {
  const [user, setUser] = useState<Customer | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isEdit, setEdit] = useState<boolean>(false)

  const navigate = useNavigate()

  function onEdit(): void {
    setEdit(prev => !prev)
  }

  useEffect(() => {
    const token = localStorageService.getItem(TOKEN_KEY)

    if (!token) {
      navigate('/')
      return
    }

    getUser(token)
      .then(res => {
        setUser(res)
        setIsLoading(false)
      })
      .catch(err => {
        console.error(err)
      })
  }, [navigate])

  if (isLoading) {
    return <h2 className="title mt-36 text-center text-white">Loading...</h2>
  }
  if (!user) {
    return <h2 className="title mt-36 text-center text-white">Sorry, User data was not found</h2>
  }
  return <Profile user={user} onEdit={onEdit} isEdit={isEdit} />
}
