import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'
import { isAdressActionType } from 'utils/isAddressActionType'
import {
  createBillingActions,
  createDefaultBillingActions,
  createDefaultShippingActions,
  createShippingActions,
} from 'utils/createAction'

import { refreshClientCreate } from './apiClients/refreshTokenClient'
import { getCustomerVersion } from './getCustomerVersion'

import type { AdressActionType } from './addAdress'
import type {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  Customer,
  MyCustomerUpdateAction,
  _BaseAddress,
} from '@commercetools/platform-sdk/dist/declarations/src'
import type { ICollectedAddressField } from 'utils/collectAddress'
const actionMap = {
  addShippingAddressId: createShippingActions,
  addBillingAddressId: createBillingActions,
  setDefaultShippingAddress: createDefaultShippingActions,
  setDefaultBillingAddress: createDefaultBillingActions,
}
async function setAdressAs(
  action: AdressActionType,
  addressId: string,
  version: number,
): Promise<ClientResponse<Customer>> {
  const token = localStorageService.getItem(TOKEN_KEY) as string
  const client = refreshClientCreate(token)
  const actions: MyCustomerUpdateAction[] = []
  try {
    const response = await client.me().get().execute()

    actionMap[action](response.body, addressId).forEach(element => actions.push(element))

    actions.push({ action, addressId })

    return await client
      .me()
      .post({
        body: {
          version,
          actions,
        },
      })
      .execute()
  } catch (err) {
    throw new Error(String(err))
  }
}

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
        await setAdressAs(addressInfo.radioOption, addressInfo.id, newVersion)
      }
    }, Promise.resolve())
  } catch (err) {
    console.error(err)
  }
}
