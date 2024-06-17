import { type IChangeMainInfoProps, changeMainInfo } from './changeMainInfo'
import { changeAddress } from './changeAddress'
import { deleteAddressesArray } from './deleteAdress'

import type { ICollectedAddressField } from 'types/types'

interface IChangeUserInfo {
  user: IChangeMainInfoProps
  addressData: ICollectedAddressField[]
  addressesIds: string[]
}
export async function changeUserInfo({ user, addressData, addressesIds }: IChangeUserInfo): Promise<void> {
  try {
    await changeMainInfo(user)
    await changeAddress(addressData)
    await deleteAddressesArray(addressesIds)
  } catch (err) {
    throw new Error(String(err))
  }
}
