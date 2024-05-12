import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Form from 'components/Form/Form'
import { loginUser } from 'api/loginUser'

import { ErrorModal } from './Error-message-server-modal'
import Link from '../../components/Link'
import { LoginImages } from './login-Images'
import { fields } from './login-filds-data/login-filds-data'

import type { OnDataSend } from 'types/types'
import type { Customer } from '@commercetools/platform-sdk'
import type { UserAuthOptions } from '@commercetools/sdk-client-v2'
interface UserData {
  email: string
  password: string
}

const useErrorMessage = (): [string, (value: string) => void] => {
  const [errorMessage, setErrorMessage] = useState<string>('')
  return [errorMessage, setErrorMessage]
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useErrorMessage()

  const onDataSend: OnDataSend = data => {
    const userData: UserData = JSON.parse(data) as UserData
    const loginData: UserAuthOptions = {
      username: userData.email,
      password: userData.password,
    }

    const responseLoginData = async (): Promise<Customer> => {
      return loginUser(loginData)
    }

    responseLoginData()
      .then(res => {
        navigate('/')
        return res
      })
      .catch(err => {
        if (err instanceof Error) {
          const { message } = err
          setErrorMessage(message)
        }
      })
  }

  return (
    <main className="relative flex-grow bg-[#282828]">
      <h2 className="title mt-24 text-center max-lg:text-7xl max-md:text-6xl max-sm:text-5xl">Welcome Back!</h2>
      <p className="basic-text text-center">Log In to access your account.</p>
      <div className="m-auto max-w-lg px-[10px]">
        <Form fields={fields} onDataSend={onDataSend}></Form>
        {errorMessage ? <ErrorModal errorMessage={errorMessage} onErrorMessageChange={setErrorMessage} /> : null}
        <Link href="/registration">Create Account</Link>
      </div>
      <LoginImages />
    </main>
  )
}
