import type { Address, Customer } from '@commercetools/platform-sdk'

export const generateAdressTitle = (user: Customer, adress: Address): string => {
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
