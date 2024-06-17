import { anonymousClient } from 'api/apiClients/anonymousClient'
import { refreshClientCreate } from 'api/apiClients/refreshTokenClient'
import { CART_KEY, TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { getCartVersion } from './addItemToCart'

import type { Cart, CartUpdateAction, ClientResponse } from '@commercetools/platform-sdk'

export async function addPromocode(code: string): Promise<ClientResponse<Cart> | undefined> {
  const token = localStorageService.getItem(TOKEN_KEY)

  const client = token ? refreshClientCreate(token) : anonymousClient()
  const cartId = localStorageService.getItem(CART_KEY) as string

  const addPromoAction: CartUpdateAction[] = [
    {
      action: 'addDiscountCode',
      code,
    },
  ]

  try {
    const version = await getCartVersion(cartId)
    if (version) {
      return await client
        .carts()
        .withId({ ID: cartId })
        .post({ body: { version, actions: addPromoAction } })
        .execute()
    }
    return
  } catch (err) {
    throw new Error(String(err))
  }
}
