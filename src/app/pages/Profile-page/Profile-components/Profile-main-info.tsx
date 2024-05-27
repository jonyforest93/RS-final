import { useState } from 'react'

import { ProfileField } from './Profile-field'

import type { ChangeEventHandler } from 'react'
import type { Customer } from '@commercetools/platform-sdk'

type IProfileMainInfoProps = Pick<Customer, 'firstName' | 'lastName' | 'dateOfBirth' | 'email'> & { isEdit: boolean }

export const ProfileMainInformation: React.FC<IProfileMainInfoProps> = ({
  email = '',
  firstName = '',
  lastName = '',
  dateOfBirth = '',
  isEdit,
}) => {
  const [emailValue, setEmailValue] = useState(email)
  const [firstNameValue, setFirstNameValue] = useState(firstName)
  const [lastNameValue, setLastNameValue] = useState(lastName)
  const [dateOfBirthValue, setDateOfBirthValue] = useState(dateOfBirth)

  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isEdit) {
      setEmailValue(e.target.value)
    }
  }
  const handleFirstNameChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isEdit) {
      setFirstNameValue(e.target.value)
    }
  }
  const handleLastNameChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isEdit) {
      setLastNameValue(e.target.value)
    }
  }
  const handleDateOfBirthChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isEdit) {
      setDateOfBirthValue(e.target.value)
    }
  }
  return (
    <div className="relative z-20  min-w-[500px]">
      <ProfileField name="Email" value={emailValue} onChange={handleEmailChange} />
      <ProfileField name="First Name" value={firstNameValue} onChange={handleFirstNameChange} />
      <ProfileField name="Last Name" value={lastNameValue} onChange={handleLastNameChange} />
      <ProfileField name="Date of Birth" value={dateOfBirthValue} onChange={handleDateOfBirthChange} />
    </div>
  )
}
