import { refreshClientCreate } from 'api/apiClients/refreshTokenClient'

import type { Cart } from '@commercetools/platform-sdk'
import type { ClientResponse } from '@commercetools/sdk-client-v2'

export async function getActiveCart(token: string): Promise<ClientResponse<Cart>> {
  const client = refreshClientCreate(token)
  try {
    return (await client.me().activeCart().get().execute()) as ClientResponse<Cart>
  } catch (err) {
    throw new Error(String(err))
  }
}
