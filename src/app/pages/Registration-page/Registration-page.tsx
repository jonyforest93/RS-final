import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Form from 'components/Form/Form'
import { registration } from 'api/registration'
import { ErrorModal } from 'pages/Login-page/Error-message-server-modal'
import { tokenData } from 'services/token-storage'
import { Context } from 'services/Context'
import { Modal } from 'components/modal/Modal'

import { billingFields, registrationFields, shippingFields } from './registration-fields'
import { RegistrationImages } from './Registration-images'
import { RegistrationTitle } from './Registration-title'

import type { OnDataSend } from 'types/types'

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate()
  const { setIsLoggedUser } = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('LowerFlowerToken')) {
      navigate('/')
    }
  }, [])

  const [errorMessage, setErrorMessage] = useState<string>('')
  const [modalMessage, setModalMessage] = useState<string>('')
  const [display, setDisplay] = useState<boolean>(false)
  const [displayModal, setDisplayModal] = useState<boolean>(false)

  const onDataSend: OnDataSend = data => {
    registration(data)
      .then(() => {
        setModalMessage('Congratulations! You have successfully registered!')
        setDisplayModal(true)
        setTimeout(() => {
          setDisplayModal(false)
          navigate('/')
        }, 2000)
        const token = tokenData.get().refreshToken
        localStorage.setItem('LowerFlowerToken', JSON.stringify(token))
        setIsLoggedUser(true)
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
          data-testid="registrationForm"
        ></Form>
        {display ? (
          <ErrorModal errorMessage={errorMessage} isDisplayed={display} setDisplay={setDisplay}></ErrorModal>
        ) : null}
        {displayModal ? <Modal modalText={modalMessage} isDisplay={displayModal} /> : null}
      </div>
    </div>
  )
}
