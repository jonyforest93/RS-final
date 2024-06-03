import { anonymousClient } from './BuildClient'
import { refreshClientCreate } from './refreshtoken'

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
