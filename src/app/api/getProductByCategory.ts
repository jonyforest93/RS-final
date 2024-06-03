import { formattedSortProduct } from 'utils/formattedProduct'

import { anonymousClient } from './apiClients/anonymousClient'
import { refreshClientCreate } from './apiClients/refreshTokenClient'

import type { IProduct } from 'types/types'

export const getProductByategory: (id: string) => Promise<IProduct[]> = async id => {
  const token = localStorage.getItem('LowerFlowerToken')
  const client = token ? refreshClientCreate(token) : anonymousClient()

  try {
    const products = await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: `categories.id:"${id}"`,
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
