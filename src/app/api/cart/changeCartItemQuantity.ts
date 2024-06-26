import { anonymousClient } from 'api/apiClients/anonymousClient'
import { refreshClientCreate } from 'api/apiClients/refreshTokenClient'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { getCartVersion } from './addItemToCart'

import type { CartUpdateAction } from '@commercetools/platform-sdk'

export async function changeCartItemQuantity(cartId: string, itemId: string, quantity: number): Promise<void> {
  const token = localStorageService.getItem(TOKEN_KEY)

  const client = token ? refreshClientCreate(token) : anonymousClient()
  const changeLineItemActions: CartUpdateAction[] = [
    {
      action: 'changeLineItemQuantity',
      quantity,
      lineItemId: itemId,
    },
  ]

  try {
    const version = await getCartVersion(cartId)
    if (version) {
      await client
        .carts()
        .withId({ ID: cartId })
        .post({ body: { version, actions: changeLineItemActions } })
        .execute()
    }
  } catch (err) {
    throw new Error(String(err))
  }
}
