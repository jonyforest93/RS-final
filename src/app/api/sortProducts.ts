import { formattedSortProduct } from 'utils/formattedProduct'

import { anonymousClient } from './BuildClient'
import { refreshClientCreate } from './refreshtoken'

import type { IProduct } from 'types/types'

export const sortByPrice: (direction: string) => Promise<IProduct[]> = async direction => {
  const token = localStorage.getItem('LowerFlowerToken')

  const client = token ? refreshClientCreate(token) : anonymousClient()

  try {
    const products = await client
      .productProjections()
      .search()
      .get({ queryArgs: { sort: `price ${direction}` } })
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

export const sortByName: (direction: string) => Promise<IProduct[]> = async direction => {
  const token = localStorage.getItem('LowerFlowerToken')

  const client = token ? refreshClientCreate(token) : anonymousClient()

  try {
    const products = await client
      .productProjections()
      .get({ queryArgs: { sort: `name.en-US ${direction}` } })
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
