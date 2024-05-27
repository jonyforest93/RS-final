import type { Address, Customer } from '@commercetools/platform-sdk'

export const generateAdressTitle = (user: Customer, adress: Address): string => {
  const isBilling = user.billingAddressIds?.includes(adress.id as string)

  if (user.shippingAddressIds?.includes(adress.id as string) && user.billingAddressIds?.includes(adress.id as string)) {
    return 'Shipping Adress / Billing Adress'
  }
  if (user.defaultBillingAddressId === adress.id) {
    return 'Default Billing adress'
  }
  if (user.defaultShippingAddressId === adress.id) {
    return 'Default Shipping Adress'
  }
  if (isBilling) {
    return 'Billing Adress'
  }
  return 'Shipping Adress'
}
