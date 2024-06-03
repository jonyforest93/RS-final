import { formattedProduct } from 'utils/formattedProduct'

import { anonymousClient } from './BuildClient'
import { refreshClientCreate } from './refreshtoken'

import type { IProduct } from 'types/types'

export const getProducts: () => Promise<IProduct[]> = async () => {
  const token = localStorage.getItem('LowerFlowerToken')

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
