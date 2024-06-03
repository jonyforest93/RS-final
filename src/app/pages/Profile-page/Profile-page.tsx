import { useState } from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'
import { Modal } from 'components/modal/Modal'
import Form from 'components/Form/Form'
import { changePassword } from 'api/changePassword'
import { toChangePasswordData } from 'utils/toChangePasswordData'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'
import { EditForm } from 'components/Form/EditForm'
import { AdressForm } from 'components/Form/AddressForm'
import { addAdress } from 'api/addAdress'
import { useRefreshPage } from 'hooks/useRefreshPage.hook'
import { changeUserInfo } from 'api/changeUserInfo'

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
export interface IProfileModalMessage {
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

  async function onMainFieldDataSend({
    firstName,
    lastName,
    dateOfBirth,
    email,
    addressData,
  }: IFormData): Promise<void> {
    setModalMessage({ isShowMessage: true, text: 'Сhanges have been saved' })
    try {
      await changeUserInfo({
        user: { firstName, lastName, dateOfBirth, email },
        addressData,
      })
      setTimeout(() => {
        refreshPage()
      }, MESSAGE_SHOW_TIME)
    } catch (err) {
      setModalMessage({ isShowMessage: true, text: 'err' })
      hideMessage()
    }
  }

  async function onPasswordDataSend(data: string): Promise<void> {
    showPasswordForm(false)
    const transofmedData = toChangePasswordData(data)
    const token = localStorageService.getItem(TOKEN_KEY)
    if (!token) {
      return
    }
    try {
      await changePassword(token, transofmedData.currentPassword, transofmedData.newPassword)
      setModalMessage({ isShowMessage: true, text: 'Your password have been changed' })
      hideMessage()
    } catch (err) {
      setModalMessage({ isShowMessage: true, text: String(err) })
      hideMessage()
    }
  }

  async function onAddressDataSend(data: IAdressFormData): Promise<void> {
    try {
      await addAdress({
        country: 'US',
        city: data.city,
        streetName: data.streetName,
        postalCode: data.postalCode,
        action: data.radioOption,
      })
      setModalMessage({ isShowMessage: true, text: 'The address has been added !' })
      hideMessage()
    } catch (err) {
      setModalMessage({ isShowMessage: true, text: String(err) })
      hideMessage()
    }
    showAdressForm(false)
  }

  return (
    <main className="relative flex w-[100%] flex-grow flex-col items-center justify-between overflow-hidden px-3 pb-10 text-white">
      <h1 className="title z-20 mt-28">User Profile</h1>
      <h2 className="title z-20 text-2xl">Main information</h2>
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
          onDataSend={onMainFieldDataSend}
          onEdit={onEdit}
        ></EditForm>
      </div>
      <ProfileImages />

      <div className="z-10 mt-10 flex gap-5">
        <BaseButton
          className="link"
          onClick={() => {
            showPasswordForm(true)
          }}
        >
          Change Password
        </BaseButton>
        <BaseButton
          className="link"
          onClick={() => {
            showAdressForm(true)
          }}
        >
          Add new Adress
        </BaseButton>
      </div>

      {isPasswordFormShow ? (
        <Modal isDisplay={isPasswordFormShow} bg="black" setDisplay={showPasswordForm}>
          <Form fields={passwordChangeFields} onDataSend={onPasswordDataSend} />
        </Modal>
      ) : null}
      {isAdressFormShow ? (
        <Modal isDisplay={isAdressFormShow} bg="black" setDisplay={showAdressForm}>
          <AdressForm fields={addAdressFields} onDataSend={onAddressDataSend} />
        </Modal>
      ) : null}
      <Modal isDisplay={modalMessage.isShowMessage} bg="black">
        {modalMessage.text}
      </Modal>
    </main>
  )
}
