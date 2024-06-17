import { formattedSortProduct } from 'utils/formattedProduct'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { refreshClientCreate } from './apiClients/refreshTokenClient'
import { anonymousClient } from './apiClients/anonymousClient'

import type { IProduct } from 'types/types'

export const getProducts: (page: number) => Promise<IProduct[]> = async page => {
  const token = localStorageService.getItem(TOKEN_KEY)

  const client = token ? refreshClientCreate(token) : anonymousClient()

  const limit = 6
  const offset = page * limit - limit

  try {
    const products = await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          sort: `price desc`,
          limit,
          offset,
          priceCurrency: 'USD',
        },
      })
      .execute()

    const formattedProducts = products.body.results.map(item => {
      const product = formattedSortProduct(item)
      return product
    })

    return formattedProducts
  } catch (err) {
    throw new Error(String(err))
  }
}
