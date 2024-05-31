import { useState } from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'
import { Modal } from 'components/modal/Modal'
import Form from 'components/Form/Form'
import { changePassword } from 'api/changePassword'
import { toChangePasswordData } from 'utils/toChangePasswordData'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'
import { EditForm } from 'components/Form/EditForm'
import { changeMainInfo } from 'api/changeMainInfo'
import { AdressForm } from 'components/Form/AddressForm'
import { addAdress } from 'api/addAdress'
import { useRefreshPage } from 'hooks/useRefreshPage.hook'

import { ProfileImages } from './Profile-images'
import { passwordChangeFields } from './Profile-components/passwordChangeFields'
import { addAdressFields } from './Profile-components/addAdressFields'
import { createMainFields } from './Profile-components/mainInfoFields'

import type { IAdressFormData } from 'components/Form/AddressForm'
import type { IFormData } from 'components/Form/EditForm'
import type { Customer } from '@commercetools/platform-sdk'

interface IProfileProps {
  user: Customer
  onEdit: () => void
  isEdit: boolean
}
interface IProfileModalMessage {
  isShowMessage: boolean
  text: string
}

const MESSAGE_SHOW_TIME = 2000

export const Profile: React.FC<IProfileProps> = ({ user, onEdit, isEdit }) => {
  const refreshPage = useRefreshPage()
  const [isPasswordFormShow, showPasswordForm] = useState<boolean>(false)
  const [isAdressFormShow, showAdressForm] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<IProfileModalMessage>({ isShowMessage: false, text: '' })

  function hideMessage(): void {
    setTimeout(() => {
      setModalMessage({ isShowMessage: false, text: '' })
    }, MESSAGE_SHOW_TIME)
  }
  function onFieldsSend(data: IFormData): void {
    changeMainInfo({
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
    })
      .then(() => {
        refreshPage()
      })
      .catch(err => {
        console.error(err)
      })
  }
  function onPasswordChange(): void {
    showPasswordForm(true)
  }
  function onAdressAdd(): void {
    showAdressForm(true)
  }
  function onDataSend(data: string): void {
    showPasswordForm(false)
    const transofmedData = toChangePasswordData(data)
    const token = localStorageService.getItem(TOKEN_KEY)
    if (token) {
      changePassword(token, transofmedData.currentPassword, transofmedData.newPassword)
        .then(() => {
          setModalMessage({ isShowMessage: true, text: 'Your password have been changed' })
          hideMessage()
        })
        .catch(err => {
          setModalMessage({ isShowMessage: true, text: String(err) })
          hideMessage()
        })
    }
  }
  function onAdressDataSend(data: IAdressFormData): void {
    addAdress({
      country: 'US',
      city: data.city,
      streetName: data.streetName,
      postalCode: data.postalCode,
      action: data.radioOption,
    })
      .then(() => {
        setModalMessage({ isShowMessage: true, text: 'The address has been added !' })
        hideMessage()
      })
      .catch(err => {
        setModalMessage({ isShowMessage: true, text: String(err) })
        hideMessage()
      })
    showAdressForm(false)
  }
  return (
    <main className="relative flex w-[100%] flex-grow flex-col items-center justify-between overflow-hidden px-3 pb-10 text-white">
      <h1 className="title mt-28">User Profile</h1>
      <h2 className="title text-2xl">Main information</h2>
      <div className="relative z-20 m-auto w-[100%] px-[10px] pb-[25px]">
        <EditForm
          fields={createMainFields({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
          })}
          user={user}
          isEdit={isEdit}
          onDataSend={onFieldsSend}
          onEdit={onEdit}
        ></EditForm>
      </div>
      <ProfileImages />
      {isEdit ? (
        <>
          <div className="z-10 mt-10 flex gap-5">
            <BaseButton className="link" onClick={onPasswordChange}>
              Change Password
            </BaseButton>
            <BaseButton className="link" onClick={onAdressAdd}>
              Add new Adress
            </BaseButton>
          </div>
        </>
      ) : null}
      {isPasswordFormShow ? (
        <Modal isDisplay={isPasswordFormShow} bg="black">
          <Form fields={passwordChangeFields} onDataSend={onDataSend} />
        </Modal>
      ) : null}
      {isAdressFormShow ? (
        <Modal isDisplay={isAdressFormShow} bg="black">
          <AdressForm fields={addAdressFields} onDataSend={onAdressDataSend} />
        </Modal>
      ) : null}
      <Modal isDisplay={modalMessage.isShowMessage} bg="black">
        {modalMessage.text}
      </Modal>
    </main>
  )
}
