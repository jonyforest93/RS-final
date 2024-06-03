import { formattedSortProduct } from 'utils/formattedProduct'

import { refreshClientCreate } from './apiClients/refreshTokenClient'
import { anonymousClient } from './apiClients/anonymousClient'

import type { IProduct } from 'types/types'

export const searchProducts: (productName: string) => Promise<IProduct[]> = async productName => {
  const token = localStorage.getItem('LowerFlowerToken')

  const client = token ? refreshClientCreate(token) : anonymousClient()

  try {
    const products = await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'text.en-US': productName,
          fuzzy: true,
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
