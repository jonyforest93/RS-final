import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Form from 'components/Form/Form'
import { registration } from 'api/registration'
import { ErrorModal } from 'pages/Login-page/Error-message-server-modal'
import { tokenData } from 'services/token-storage'

import { billingFields, registrationFields, shippingFields } from './registration-fields'
import { RegistrationImages } from './Registration-images'
import { RegistrationTitle } from './Registration-title'

import type { OnDataSend } from 'types/types'

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('LowerFlowerToken')) {
      navigate('/')
    }
  }, [])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const onDataSend: OnDataSend = data => {
    registration(data)
      .then(() => {
        navigate('/')
        const token = tokenData.get().refreshToken
        localStorage.setItem('LowerFlowerToken', JSON.stringify(token))
      })
      .catch(err => {
        if (err instanceof Error) {
          setErrorMessage(err.message)
        }
      })
  }
  return (
    <div className=" relative m-auto  flex w-[100%] flex-grow flex-col items-center justify-between overflow-x-hidden">
      <RegistrationImages />
      <RegistrationTitle />
      <div className="z-10 m-auto w-[100%] px-[10px]">
        <Form
          fields={registrationFields}
          onDataSend={onDataSend}
          isRegister={true}
          shippingFields={shippingFields}
          billingFields={billingFields}
        ></Form>
        {errorMessage ? <ErrorModal errorMessage={errorMessage}></ErrorModal> : null}
      </div>
    </div>
  )
}
