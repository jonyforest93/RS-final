import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Form from 'components/Form/Form'
import { registerUser } from 'api/registration'
import { ErrorModal } from 'pages/Login-page/Error-message-server-modal'
import { tokenData } from 'services/token-storage'
import { loginContext } from 'services/Context'
import { Modal } from 'components/modal/Modal'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { billingFields, registrationFields, shippingFields } from './registration-fields'
import { RegistrationImages } from './Registration-images'
import { RegistrationTitle } from './Registration-title'

import type { OnDataSend } from 'types/types'

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate()
  const { setIsLoggedUser } = useContext(loginContext)

  useEffect(() => {
    if (localStorage.getItem('LowerFlowerToken')) {
      navigate('/')
    }
  }, [])

  const [modalMessage, setModalMessage] = useState<string>('')
  const [display, setDisplay] = useState<boolean>(false)
  const [displayModal, setDisplayModal] = useState<boolean>(false)

  const onDataSend: OnDataSend = data => {
    registerUser(data)
      .then(() => {
        setModalMessage('Congratulations! You have successfully registered!')
        setDisplayModal(true)
        setTimeout(() => {
          setDisplayModal(false)
          const token = tokenData.get().refreshToken
          if (token) {
            localStorageService.setItem(TOKEN_KEY, token)
          }
          setIsLoggedUser(true)
          navigate('/')
        }, 2000)
      })
      .catch(err => {
        if (err instanceof Error) {
          setDisplay(true)
          setModalMessage(err.message)
        }
      })
  }

  return (
    <div className=" relative m-auto  flex w-[100%] flex-grow flex-col items-center justify-between overflow-x-hidden">
      <RegistrationImages />
      <RegistrationTitle />
      <div className="z-10 m-auto w-[100%] px-[10px] pb-[25px]">
        <Form
          fields={registrationFields}
          onDataSend={onDataSend}
          isRegister={true}
          shippingFields={shippingFields}
          billingFields={billingFields}
          data-testid="registrationForm"
        ></Form>
        {display ? (
          <ErrorModal errorMessage={modalMessage} isDisplayed={display} setDisplay={setDisplay}></ErrorModal>
        ) : null}
        {displayModal ? (
          <Modal bg={'black'} isDisplay={displayModal}>
            {modalMessage}
          </Modal>
        ) : null}
      </div>
    </div>
  )
}
