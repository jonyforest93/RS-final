import { ProfileField } from './Profile-field'

import type { Address } from '@commercetools/platform-sdk'

interface IProfileAdressProps {
  adress: Address
  title: string
}

export const ProfileAdress: React.FC<IProfileAdressProps> = ({ adress, title }) => {
  return (
    <div className="flex  flex-col items-center">
      <div className="flex w-[500px] flex-col gap-3">
        <h3 className="link text-center">{title}</h3>
        <ProfileField name={'Country'} value={adress.country} />
        <ProfileField name={'City'} value={adress.city ? adress.city : ''} />
        <ProfileField name={'Street'} value={adress.streetName ? adress.streetName : ''} />
        <ProfileField name={'Postal Code'} value={adress.postalCode ? adress.postalCode : ''} />
      </div>
    </div>
  )
}
