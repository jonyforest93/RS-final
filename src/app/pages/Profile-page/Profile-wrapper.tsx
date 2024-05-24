import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUser } from 'api/getUser'

import { Profile } from './Profile-page'

import type { Customer } from '@commercetools/platform-sdk'

export const ProfileWrapper: React.FC = () => {
  const [user, setUser] = useState<Customer>(Object)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('LowerFlowerToken')
    if (token) {
      getUser(token)
        .then(res => {
          setUser(res)
          setIsLoading(false)
        })
        .catch(err => {
          console.error(err)
        })
    } else {
      navigate('/')
    }
  }, [])
  return (
    <div>
      {isLoading ? <h2 className="title mt-36 text-center text-white">Loading...</h2> : <Profile user={user} />}
    </div>
  )
}
