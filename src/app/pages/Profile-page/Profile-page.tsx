import { ProfileAdress } from './Profile-components/Profile-adress'
import { ProfileMainInformation } from './Profile-components/Profile-main-info'
import { ProfileImages } from './Profile-images'

import type { Address, Customer } from '@commercetools/platform-sdk'

interface IProfileProps {
  user: Customer
}

const generateAdressTitle = (user: Customer, adress: Address): string => {
  const isDefaultBillingAddressId = user.defaultBillingAddressId === adress.id
  const isDefaultShippingAddressId = user.defaultShippingAddressId === adress.id

  if (isDefaultBillingAddressId && isDefaultShippingAddressId) {
    return 'Default Shipping Adress / Default Billing Adress'
  }
  if (isDefaultBillingAddressId) {
    return 'Default Billing adress'
  }
  if (isDefaultShippingAddressId) {
    return 'Default Shipping Adress'
  }
  return 'Adress'
}

export const Profile: React.FC<IProfileProps> = ({ user }) => {
  return (
    <main className="relative flex flex-grow flex-col items-center justify-between overflow-hidden pb-10 text-white">
      <h1 className="title mt-28">User Profile</h1>
      <h2 className="title text-2xl">Main information</h2>
      <ProfileMainInformation firstName={user.firstName} lastName={user.lastName} dateOfBirth={user.dateOfBirth} />
      <h2 className="title mt-4 text-2xl">Adresses</h2>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {user.addresses.length
          ? user.addresses.map((adress, index) => {
              const adressTitle = generateAdressTitle(user, adress)
              return <ProfileAdress adress={adress} key={index} title={adressTitle}></ProfileAdress>
            })
          : null}
      </div>
      <ProfileImages />
    </main>
  )
}
