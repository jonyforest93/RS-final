import { anonymousClient } from 'api/apiClients/anonymousClient'
import { refreshClientCreate } from 'api/apiClients/refreshTokenClient'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import type { ClientResponse } from '@commercetools/sdk-client-v2'
import type { Cart } from '@commercetools/platform-sdk'

export async function getCartItems(id: string): Promise<Cart> {
  const token = localStorageService.getItem(TOKEN_KEY)

  const client = token ? refreshClientCreate(token) : anonymousClient()

  try {
    return (await client.carts().withId({ ID: id }).get().execute()).body
  } catch (err) {
    throw new Error(String(err))
  }
}

export async function createCart(): Promise<ClientResponse<Cart>> {
  const token = localStorageService.getItem(TOKEN_KEY)

  const client = token ? refreshClientCreate(token) : anonymousClient()
  try {
    return await client
      .carts()
      .post({ body: { currency: 'USD' } })
      .execute()
  } catch (err) {
    throw new Error(String(err))
  }
}
