import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { refreshClientCreate } from './apiClients/refreshTokenClient'

import type { ClientResponse, Customer } from '@commercetools/platform-sdk'

interface IAddAdressProps {
  country: string
  city: string
  streetName: string
  postalCode: string
  action: AdressActionType
}
export type AdressActionType =
  | 'setDefaultBillingAddress'
  | 'setDefaultShippingAddress'
  | 'addShippingAddressId'
  | 'addBillingAddressId'

export async function setAdressAs(
  action: AdressActionType,
  addressId: string,
  version: number,
): Promise<ClientResponse<Customer>> {
  const token = localStorageService.getItem(TOKEN_KEY) as string
  const client = refreshClientCreate(token)

  try {
    return await client
      .me()
      .post({
        body: {
          version,
          actions: [
            {
              action,
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

export async function addAdress({
  country = 'US',
  city,
  streetName,
  postalCode,
  action,
}: IAddAdressProps): Promise<Customer | ClientResponse<Customer>> {
  const token = localStorageService.getItem(TOKEN_KEY) as string
  const address = { country, city, streetName, postalCode }
  const client = refreshClientCreate(token)

  try {
    const addressResponse = await client
      .me()
      .get()
      .execute()
      .then(user => {
        const customerVersion = user.body.version
        return client
          .me()
          .post({
            body: {
              version: customerVersion,
              actions: [
                {
                  action: 'addAddress',
                  address,
                },
              ],
            },
          })
          .execute()
      })
    const addressId = addressResponse.body.addresses.find(adr => {
      if (
        adr.city === city &&
        adr.country === country &&
        adr.postalCode === postalCode &&
        adr.streetName === streetName
      ) {
        return true
      }
      return false
    })

    return await setAdressAs(action, addressId?.id as string, addressResponse.body.version)
  } catch (err) {
    throw new Error(String(err))
  }
}
