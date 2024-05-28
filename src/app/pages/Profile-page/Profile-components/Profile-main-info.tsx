import { ProfileField } from './Profile-field'

import type { ChangeEventHandler } from 'react'

export interface IMainInfoObject {
  email?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
}

interface IProfileMainInfoProps {
  isEdit: boolean
  mainFields: IMainInfoObject
  setMainFields: React.Dispatch<React.SetStateAction<IMainInfoObject>>
}

export const ProfileMainInformation: React.FC<IProfileMainInfoProps> = ({ isEdit, mainFields, setMainFields }) => {
  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isEdit) {
      setMainFields(prevFields => ({
        ...prevFields,
        email: e.target.value,
      }))
    }
  }
  const handleFirstNameChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isEdit) {
      setMainFields(prevFields => ({
        ...prevFields,
        firstName: e.target.value,
      }))
    }
  }
  const handleLastNameChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isEdit) {
      setMainFields(prevFields => ({
        ...prevFields,
        lastName: e.target.value,
      }))
    }
  }
  const handleDateOfBirthChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isEdit) {
      setMainFields(prevFields => ({
        ...prevFields,
        dateOfBirthe: e.target.value,
      }))
    }
  }
  return (
    <div className="relative z-20  min-w-[500px]">
      <ProfileField name="Email" value={mainFields.email || ''} onChange={handleEmailChange} />
      <ProfileField name="First Name" value={mainFields.firstName || ''} onChange={handleFirstNameChange} />
      <ProfileField name="Last Name" value={mainFields.lastName || ''} onChange={handleLastNameChange} />
      <ProfileField name="Date of Birth" value={mainFields.dateOfBirth || ''} onChange={handleDateOfBirthChange} />
    </div>
  )
}
