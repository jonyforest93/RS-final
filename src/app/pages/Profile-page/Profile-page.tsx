import { generateAdressTitle } from 'utils/generateAdressTitle'
import BaseButton from 'components/shared/BaseButton/BaseButton'

import { ProfileAdress } from './Profile-components/Profile-adress'
import { ProfileMainInformation } from './Profile-components/Profile-main-info'
import { ProfileImages } from './Profile-images'

import type { Customer } from '@commercetools/platform-sdk'

interface IProfileProps {
  user: Customer
  onEdit: () => void
  isEdit: boolean
}

export const Profile: React.FC<IProfileProps> = ({ user, onEdit, isEdit }) => {
  function handleEdit(): void {
    onEdit()
  }

  function handleSave(): void {
    onEdit()
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
            <BaseButton className="link">Change Password</BaseButton>
            <BaseButton className="link">Add new Adress</BaseButton>
          </div>
          <div className="z-10 mt-10">
            <BaseButton onClick={handleSave}>Save</BaseButton>
          </div>
        </>
      ) : (
        <div className="z-10 mt-10">
          <BaseButton onClick={handleEdit}>Edit mode</BaseButton>
        </div>
      )}
    </main>
  )
}
