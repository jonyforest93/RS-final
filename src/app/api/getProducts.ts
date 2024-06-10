import { formattedProduct } from 'utils/formattedProduct'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { refreshClientCreate } from './apiClients/refreshTokenClient'
import { anonymousClient } from './apiClients/anonymousClient'

import type { IProduct } from 'types/types'

export const getProducts: () => Promise<IProduct[]> = async () => {
  const token = localStorageService.getItem(TOKEN_KEY)

  const client = token ? refreshClientCreate(token) : anonymousClient()

  try {
    const products = await client.products().get().execute()

    const formattedProducts = products.body.results.map(item => {
      const product = formattedProduct(item)
      return product
    })

    return formattedProducts
  } catch (err) {
    throw new Error(String(err))
  }
}
