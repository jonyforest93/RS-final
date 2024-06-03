import { anonymousClient } from './apiClients/anonymousClient'
import { refreshClientCreate } from './apiClients/refreshTokenClient'

export interface ICategory {
  id: string
  name: string
}

export const getCategory: () => Promise<ICategory[]> = async () => {
  const token = localStorage.getItem('LowerFlowerToken')

  const client = token ? refreshClientCreate(token) : anonymousClient()

  try {
    const categories = await client.categories().get().execute()

    const formattedCategory = categories.body.results.map(el => {
      const { id } = el
      const name = el.name['en-US']

      const category = {
        id,
        name,
      }

      return category
    })

    return formattedCategory
  } catch (err) {
    throw new Error(String(err))
  }
}
