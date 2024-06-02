import type { Address, Customer } from '@commercetools/platform-sdk'

export const generateAdressTitle = (user: Customer, adress: Address): string => {
  const isBilling = user.billingAddressIds?.includes(adress.id as string)
  const billingDefault = user.defaultBillingAddressId === adress.id
  const shippingDefault = user.defaultShippingAddressId === adress.id
  if (billingDefault && shippingDefault) {
    return 'Default shipping address / Default billing address'
  }

  if (billingDefault) {
    return 'Default billing address'
  }

  if (shippingDefault) {
    return 'Default shipping address'
  }

  if (user.shippingAddressIds?.includes(adress.id as string) && user.billingAddressIds?.includes(adress.id as string)) {
    return 'Shipping Adress / Billing Adress'
  }

  if (isBilling) {
    return 'Billing Address'
  }

  return 'Shipping Address'
}
