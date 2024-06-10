import { anonymousClient } from 'api/apiClients/anonymousClient'
import { refreshClientCreate } from 'api/apiClients/refreshTokenClient'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { getCartVersion } from './addItemToCart'

import type { CartUpdateAction, LineItem } from '@commercetools/platform-sdk'

export async function clearCart(cartId: string, products: LineItem[]): Promise<void> {
  const token = localStorageService.getItem(TOKEN_KEY)

  const client = token ? refreshClientCreate(token) : anonymousClient()
  const removeLineItemActions: CartUpdateAction[] = products.map(({ id }) => ({
    action: 'removeLineItem',
    lineItemId: id,
  }))

  try {
    const version = await getCartVersion(cartId)
    if (version) {
      await client
        .carts()
        .withId({ ID: cartId })
        .post({ body: { version, actions: removeLineItemActions } })
        .execute()
    }
  } catch (err) {
    throw new Error(String(err))
  }
}
