import { refreshClientCreate } from './apiClients/refreshTokenClient'
import { anonymousClient } from './apiClients/anonymousClient'

import type { Product } from '@commercetools/platform-sdk'

export const getProductsProductPage: () => Promise<Product[]> = async () => {
  const token = localStorage.getItem('LowerFlowerToken')

  const client = token ? refreshClientCreate(token) : anonymousClient()

  try {
    const products = await client.products().get().execute()
    return products.body.results
  } catch (err) {
    throw new Error(String(err))
  }
}
