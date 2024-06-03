import type { AdressActionType } from 'api/addAdress'

export function isAdressActionType(value: unknown): value is AdressActionType {
  return (
    value === 'setDefaultBillingAddress' ||
    value === 'setDefaultShippingAddress' ||
    value === 'addShippingAddressId' ||
    value === 'addBillingAddressId'
  )
}
