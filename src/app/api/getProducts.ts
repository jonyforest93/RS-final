import { anonymousClient } from './apiClients/anonymousClient'
import { refreshClientCreate } from './apiClients/refreshTokenClient'

export interface IProduct {
  key?: string
  title: string
  image?: string
  price?: number
  discountPrice?: number
}

export const getProducts: () => Promise<IProduct[]> = async () => {
  const token = localStorage.getItem('LowerFlowerToken')

  const client = token ? refreshClientCreate(token) : anonymousClient()

  try {
    const products = await client.products().get().execute()
    const formattedProducts = products.body.results.map(item => {
      const { key } = item
      const title = item.masterData.current.name['en-US']

      const image = item.masterData.current.masterVariant.images
        ? item.masterData.current.masterVariant.images[0].url
        : undefined
      const { prices } = item.masterData.current.masterVariant
      const price = prices && prices.length > 0 ? prices[0].value.centAmount / 100 : undefined
      const discountPrice =
        prices && prices.length > 0 && prices[0].discounted ? prices[0].discounted.value.centAmount / 100 : undefined

      const product: IProduct = {
        key,
        title,
        image,
        price,
        discountPrice,
      }

      return product
    })

    return formattedProducts
  } catch (err) {
    throw new Error(String(err))
  }
}
