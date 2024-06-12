import { anonymousClient } from 'api/apiClients/anonymousClient'
import { refreshClientCreate } from 'api/apiClients/refreshTokenClient'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

interface CartItem {
  productKey: string
  productId: string
  quantity: number
}
export async function getCartVersion(id: string): Promise<number | undefined> {
  const token = localStorageService.getItem(TOKEN_KEY)

  const client = token ? refreshClientCreate(token) : anonymousClient()
  try {
    const {
      body: { version },
    } = await client.carts().withId({ ID: id }).get().execute()

    return version
  } catch (err) {
    throw new Error(String(err))
  }
}

export async function addCartItem(cartItem: CartItem, cartId: string): Promise<void> {
  const token = localStorageService.getItem(TOKEN_KEY)

  const client = token ? refreshClientCreate(token) : anonymousClient()
  const { productId } = cartItem
  try {
    const version = await getCartVersion(cartId)
    if (version) {
      await client
        .carts()
        .withId({ ID: cartId })
        .post({
          body: {
            version,
            actions: [{ action: 'addLineItem', productId }],
          },
        })
        .execute()
    }
  } catch (err) {
    throw new Error(String(err))
  }
}
