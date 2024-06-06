import { anonymousClient } from './apiClients/anonymousClient'
import { refreshClientCreate } from './apiClients/refreshTokenClient'

import type { Category } from '@commercetools/platform-sdk'

export interface ICategory {
  id: string
  name: string
  subCategory: Category | undefined
}

export const getCategory: () => Promise<ICategory[]> = async () => {
  const token = localStorage.getItem('LowerFlowerToken')

  const client = token ? refreshClientCreate(token) : anonymousClient()

  try {
    const categories = await client.categories().get().execute()
    const subCategories: Category[] = []
    const formattedCategory = categories.body.results
      .filter(result => {
        if (result.parent) {
          subCategories.push(result)
          return false
        }
        return true
      })
      .map(el => {
        const { id } = el
        const name = el.name['en-US']
        const subCategory = subCategories.find(element => element.parent?.id === id)
        const category = {
          id,
          name,
          subCategory,
        }

        return category
      })
    return formattedCategory
  } catch (err) {
    throw new Error(String(err))
  }
}
