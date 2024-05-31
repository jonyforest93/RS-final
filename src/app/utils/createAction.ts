import type { AdressActionType } from 'api/addAdress'
interface ICreateActionProps {
  shippingAddress: boolean
  defaultBillingAddress: boolean
  defaultShippingAddress: boolean
}
export function createAction({
  shippingAddress,
  defaultBillingAddress,
  defaultShippingAddress,
}: ICreateActionProps): AdressActionType {
  if (defaultBillingAddress) {
    return 'setDefaultBillingAddress'
  }
  if (defaultShippingAddress) {
    return 'setDefaultShippingAddress'
  }
  if (shippingAddress) {
    return 'addShippingAddressId'
  }
  return 'addBillingAddressId'
}
