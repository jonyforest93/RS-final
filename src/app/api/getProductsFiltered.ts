import { formattedSortProduct } from 'utils/formattedProduct'

import { refreshClientCreate } from './apiClients/refreshTokenClient'
import { anonymousClient } from './apiClients/anonymousClient'

import type { IProduct } from 'types/types'

export const getProductsFiltered: (
  minPrice: string,
  maxPrice: string,
  minHeight: string,
  maxHeight: string,
) => Promise<IProduct[]> = async (minPrice, maxPrice, minHeight, maxHeight) => {
  const token = localStorage.getItem('LowerFlowerToken')

  const client = token ? refreshClientCreate(token) : anonymousClient()

  const currencyCode = 'USD'

  try {
    const products = await client
      .productProjections()
      .search()
      .get({
        queryArgs: {
          'filter.query': [
            `variants.scopedPrice.value.centAmount:range (${minPrice} to ${maxPrice})`,
            `variants.attributes.height:range (${minHeight} to ${maxHeight})`,
          ],
          priceCurrency: currencyCode,
        },
      })
      .execute()

    const formattedProducts = products.body.results.map(item => {
      const product = formattedSortProduct(item)
      return product
    })

    return formattedProducts
  } catch (e) {
    throw new Error()
  }
}
