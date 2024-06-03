import { type IChangeMainInfoProps, changeMainInfo } from './changeMainInfo'
import { changeAddress } from './changeAddress'

import type { ICollectedAddressField } from 'utils/collectAddress'

interface IChangeUserInfo {
  user: IChangeMainInfoProps
  addressData: ICollectedAddressField[]
}
export async function changeUserInfo({ user, addressData }: IChangeUserInfo): Promise<void> {
  try {
    await changeMainInfo(user)
    await changeAddress(addressData)
  } catch {
    throw new Error('Error')
  }
}
