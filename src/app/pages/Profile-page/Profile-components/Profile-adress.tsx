import { useState } from 'react'

import { ProfileField } from './Profile-field'

import type { ChangeEventHandler } from 'react'
import type { Address } from '@commercetools/platform-sdk'

interface IProfileAdressProps {
  adress: Address
  title: string
  isEdit: boolean
}

export const ProfileAdress: React.FC<IProfileAdressProps> = ({ adress, title, isEdit }) => {
  const [city, setCity] = useState<string>(adress.city ?? '')
  const [street, setStreet] = useState<string>(adress.streetName ?? '')
  const [postalCode, setPostalCode] = useState<string>(adress.postalCode ?? '')

  const handleCityChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isEdit) {
      setCity(e.target.value)
    }
  }
  const handleStreetChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isEdit) {
      setStreet(e.target.value)
    }
  }
  const handlePostalCodeChange: ChangeEventHandler<HTMLInputElement> = e => {
    if (isEdit) {
      setPostalCode(e.target.value)
    }
  }

  return (
    <div className="flex  flex-col items-center">
      <div className="flex w-[500px] flex-col gap-3">
        <h3 className="label text-center">{title}</h3>
        <ProfileField name={'Country'} value={adress.country} />
        <ProfileField name={'City'} value={city} onChange={handleCityChange} />
        <ProfileField name={'Street'} value={street} onChange={handleStreetChange} />
        <ProfileField name={'Postal Code'} value={postalCode} onChange={handlePostalCodeChange} />
      </div>
    </div>
  )
}
