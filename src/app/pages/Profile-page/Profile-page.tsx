import { useState } from 'react'

import { generateAdressTitle } from 'utils/generateAdressTitle'
import BaseButton from 'components/shared/BaseButton/BaseButton'
import { Modal } from 'components/modal/Modal'
import Form from 'components/Form/Form'
import { changePassword } from 'api/changePassword'
import { toChangePasswordData } from 'utils/toChangePasswordData'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'
import { changeMainInfo } from 'api/changeMainInfo'

import { ProfileAdress } from './Profile-components/Profile-adress'
import { ProfileMainInformation } from './Profile-components/Profile-main-info'
import { ProfileImages } from './Profile-images'
import { passwordChangeFields } from './Profile-components/passwordChangeFields'
import { addAdressFields } from './Profile-components/addAdressFields'

import type { IMainInfoObject } from './Profile-components/Profile-main-info'
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
  const [isPasswordFormShow, showPasswordForm] = useState<boolean>(false)
  const [isAdressFormShow, showAdressForm] = useState<boolean>(false)
  const [modalMessage, setModalMessage] = useState<IProfileModalMessage>({ isShowMessage: false, text: '' })

  const [mainFields, setMainFields] = useState<IMainInfoObject>({
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    dateOfBirth: user.dateOfBirth,
  })

  function hideMessage(): void {
    setTimeout(() => {
      setModalMessage({ isShowMessage: false, text: '' })
    }, MESSAGE_SHOW_TIME)
  }
  function handleEdit(): void {
    onEdit()
  }

  function handleSave(): void {
    onEdit()
    changeMainInfo(mainFields as Required<IMainInfoObject>)
      .then(() => {
        setModalMessage({ isShowMessage: true, text: 'Your data have been changed' })
        hideMessage()
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
  function onAdressDataSend(data: string): void {
    console.log(data)
    showAdressForm(false)
  }
  return (
    <main className="relative flex flex-grow flex-col items-center justify-between overflow-hidden px-3 pb-10 text-white">
      <h1 className="title mt-28">User Profile</h1>
      <h2 className="title text-2xl">Main information</h2>
      <ProfileMainInformation isEdit={isEdit} mainFields={mainFields} setMainFields={setMainFields} />
      <h2 className="title mt-4 text-2xl">Adresses</h2>
      <div className="z-20 flex flex-wrap items-center justify-center gap-5">
        {user.addresses.length
          ? user.addresses.map((adress, index) => {
              const adressTitle = generateAdressTitle(user, adress)
              return <ProfileAdress adress={adress} key={index} title={adressTitle} isEdit={isEdit}></ProfileAdress>
            })
          : null}
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
          <div className="z-10 mt-10">
            <BaseButton onClick={handleSave}>Exit</BaseButton>
          </div>
        </>
      ) : (
        <div className="z-10 mt-10">
          <BaseButton onClick={handleEdit}>Edit mode</BaseButton>
        </div>
      )}
      {isPasswordFormShow ? (
        <Modal isDisplay={isPasswordFormShow} bg="black">
          <Form fields={passwordChangeFields} onDataSend={onDataSend} />
        </Modal>
      ) : null}
      {isAdressFormShow ? (
        <Modal isDisplay={isAdressFormShow} bg="black">
          <Form fields={addAdressFields} onDataSend={onAdressDataSend} />
        </Modal>
      ) : null}
      <Modal isDisplay={modalMessage.isShowMessage} bg="black">
        {modalMessage.text}
      </Modal>
    </main>
  )
}
