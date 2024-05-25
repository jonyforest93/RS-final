import { ProfileField } from './Profile-field'

import type { Customer } from '@commercetools/platform-sdk'
type IProfileMainInfoProps = Pick<Customer, 'firstName' | 'lastName' | 'dateOfBirth'>

export const ProfileMainInformation: React.FC<IProfileMainInfoProps> = ({ firstName, lastName, dateOfBirth }) => {
  return (
    <div className="relative z-20  min-w-[500px]">
      <ProfileField name="First Name" value={firstName || ''} />
      <ProfileField name="Last Name" value={lastName || ''} />
      <ProfileField name="Date of Birth" value={dateOfBirth || ''} />
    </div>
  )
}
