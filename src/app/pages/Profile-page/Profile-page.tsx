import { useState } from 'react'

import { generateAdressTitle } from 'utils/generateAdressTitle'
import BaseButton from 'components/shared/BaseButton/BaseButton'
import { Modal } from 'components/modal/Modal'
import Form from 'components/Form/Form'
import { changePassword } from 'api/changePassword'
import { toChangePasswordData } from 'utils/toChangePasswordData'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { ProfileAdress } from './Profile-components/Profile-adress'
import { ProfileMainInformation } from './Profile-components/Profile-main-info'
import { ProfileImages } from './Profile-images'
import { passwordChangeFields } from './Profile-components/passwordChangeFields'

import type { Customer } from '@commercetools/platform-sdk'

interface IProfileProps {
  user: Customer
  onEdit: () => void
  isEdit: boolean
}

const MESSAGE_SHOW_TIME = 2000
export const Profile: React.FC<IProfileProps> = ({ user, onEdit, isEdit }) => {
  const [isFormShow, showForm] = useState<boolean>(false)
  const [isShowMessage, showMessage] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  function handleEdit(): void {
    onEdit()
  }

  function handleSave(): void {
    onEdit()
  }
  function onsPasswordChange(): void {
    showForm(true)
  }

  function onDataSend(data: string): void {
    showForm(false)
    const transofmedData = toChangePasswordData(data)
    const token = localStorageService.getItem(TOKEN_KEY)
    if (token) {
      changePassword(token, transofmedData.currentPassword, transofmedData.newPassword)
        .then(() => {
          showMessage(true)
          setMessage('Your password have been changed')
          setTimeout(() => {
            showMessage(false)
          }, MESSAGE_SHOW_TIME)
        })
        .catch(err => {
          showMessage(true)
          setMessage(String(err))
          setTimeout(() => {
            showMessage(false)
          }, MESSAGE_SHOW_TIME)
        })
    }
  }
  return (
    <main className="relative flex flex-grow flex-col items-center justify-between overflow-hidden px-3 pb-10 text-white">
      <h1 className="title mt-28">User Profile</h1>
      <h2 className="title text-2xl">Main information</h2>
      <ProfileMainInformation
        firstName={user.firstName}
        lastName={user.lastName}
        dateOfBirth={user.dateOfBirth}
        email={user.email}
        isEdit={isEdit}
      />
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
            <BaseButton className="link" onClick={onsPasswordChange}>
              Change Password
            </BaseButton>
            <BaseButton className="link">Add new Adress</BaseButton>
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
      {isFormShow ? (
        <Modal isDisplay={isFormShow} bg="black">
          <Form fields={passwordChangeFields} onDataSend={onDataSend}></Form>
        </Modal>
      ) : null}
      <Modal isDisplay={isShowMessage} bg="black">
        {message}
      </Modal>
    </main>
  )
}
