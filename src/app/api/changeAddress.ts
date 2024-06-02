import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'
import { isAdressActionType } from 'utils/isAddressActionType'

import { refreshClientCreate } from './apiClients/refreshTokenClient'
import { getCustomerVersion } from './getCustomerVersion'
import { setAdressAs as setAddressAs } from './addAdress'

import type { ByProjectKeyRequestBuilder, _BaseAddress } from '@commercetools/platform-sdk/dist/declarations/src'
import type { ICollectedAddressField } from 'utils/collectAddress'

export async function sendAddress(
  addressInfo: ICollectedAddressField,
  version: number,
  client: ByProjectKeyRequestBuilder,
): Promise<void> {
  try {
    await client
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action: 'changeAddress',
              addressId: addressInfo.id,
              address: addressInfo.address as _BaseAddress,
            },
          ],
        },
      })
      .execute()
  } catch (err) {
    console.error(err)
  }
}

export async function changeAddress(addressesData: ICollectedAddressField[]): Promise<void> {
  const token = localStorageService.getItem(TOKEN_KEY) as string
  const client = refreshClientCreate(token)
  try {
    await addressesData.reduce(async (previousPromise, addressInfo) => {
      await previousPromise
      const version = await getCustomerVersion()
      await sendAddress(addressInfo, version, client)
      if (addressInfo.radioOption && isAdressActionType(addressInfo.radioOption) && addressInfo.id) {
        const newVersion = await getCustomerVersion()
        await setAddressAs(addressInfo.radioOption, addressInfo.id, newVersion)
      }
    }, Promise.resolve())
  } catch (err) {
    console.error(err)
  }
}
