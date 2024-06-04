import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { refreshClientCreate } from './apiClients/refreshTokenClient'
import { getCustomerVersion } from './getCustomerVersion'

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'

interface IDeleteAddressFunc {
  addressId: string
  client: ByProjectKeyRequestBuilder
  version: number
}
export async function deleteAdress({ addressId, client, version }: IDeleteAddressFunc): Promise<void> {
  try {
    await client
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action: 'removeAddress',
              addressId,
            },
          ],
        },
      })
      .execute()
  } catch (err) {
    throw new Error(String(err))
  }
}

export async function deleteAddressesArray(addressesIds: string[]): Promise<void> {
  const token = localStorageService.getItem(TOKEN_KEY) as string
  const client = refreshClientCreate(token)
  if (addressesIds.length) {
    try {
      await addressesIds.reduce(async (previousePromise, addressId) => {
        await previousePromise
        const version = await getCustomerVersion()
        await deleteAdress({ addressId, client, version })
      }, Promise.resolve())
    } catch (err) {
      throw new Error(String(err))
    }
  }
}
