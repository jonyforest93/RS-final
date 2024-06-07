import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk'

export function createShippingActions(body: Customer, addressId: string): MyCustomerUpdateAction[] {
  const actions: MyCustomerUpdateAction[] = []
  if (body.defaultShippingAddressId?.includes(addressId)) {
    actions.push({ action: 'setDefaultShippingAddress', addressId: undefined })
  }
  if (body.defaultBillingAddressId?.includes(addressId)) {
    actions.push({ action: 'setDefaultBillingAddress', addressId: undefined })
  }
  if (body.billingAddressIds?.includes(addressId)) {
    actions.push({ action: 'removeBillingAddressId', addressId })
  }
  return actions
}
export function createBillingActions(body: Customer, addressId: string): MyCustomerUpdateAction[] {
  const actions: MyCustomerUpdateAction[] = []
  if (body.defaultBillingAddressId?.includes(addressId)) {
    actions.push({ action: 'setDefaultBillingAddress', addressId: undefined })
  }
  if (body.defaultShippingAddressId?.includes(addressId)) {
    actions.push({ action: 'setDefaultShippingAddress', addressId: undefined })
  }
  if (body.shippingAddressIds?.includes(addressId)) {
    actions.push({ action: 'removeShippingAddressId', addressId })
  }
  return actions
}

export function createDefaultShippingActions(body: Customer, addressId: string): MyCustomerUpdateAction[] {
  const actions: MyCustomerUpdateAction[] = []
  if (body.defaultBillingAddressId?.includes(addressId)) {
    actions.push(
      { action: 'setDefaultShippingAddress', addressId },
      { action: 'setDefaultBillingAddress', addressId: undefined },
    )
  } else if (body.billingAddressIds?.includes(addressId)) {
    actions.push({ action: 'setDefaultShippingAddress', addressId }, { action: 'removeBillingAddressId', addressId })
  }
  return actions
}
export function createDefaultBillingActions(body: Customer, addressId: string): MyCustomerUpdateAction[] {
  const actions: MyCustomerUpdateAction[] = []
  if (body.defaultShippingAddressId?.includes(addressId)) {
    actions.push(
      { action: 'setDefaultBillingAddress', addressId },
      { action: 'setDefaultShippingAddress', addressId: undefined },
    )
  } else if (body.shippingAddressIds?.includes(addressId)) {
    actions.push({ action: 'setDefaultBillingAddress', addressId }, { action: 'removeShippingAddressId', addressId })
  }
  return actions
}
