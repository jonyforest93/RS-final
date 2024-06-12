import type { Product, ProductProjection } from '@commercetools/platform-sdk'
import type { IProduct } from 'types/types'

export const formattedProduct: (product: Product) => IProduct = item => {
  const { key, id } = item
  const title = item.masterData.current.name['en-US']

  const description = item.masterData.current.description ? item.masterData.current.description['en-US'] : ''

  const image = item.masterData.current.masterVariant.images
    ? item.masterData.current.masterVariant.images[0].url
    : undefined
  const { prices } = item.masterData.current.masterVariant
  const price = prices && prices.length > 0 ? prices[0].value.centAmount / 100 : undefined
  const discountPrice =
    prices && prices.length > 0 && prices[0].discounted ? prices[0].discounted.value.centAmount / 100 : undefined

  const product: IProduct = {
    keyName: key,
    title,
    description,
    image,
    price,
    discountPrice,
    id,
  }

  return product
}

export const formattedSortProduct: (product: ProductProjection) => IProduct = item => {
  const { key, id } = item
  const title = item.name['en-US']

  const description = item.description ? item.description['en-US'] : ''

  const image = item.masterVariant.images ? item.masterVariant.images[0].url : undefined
  const { prices } = item.masterVariant
  const price = prices && prices.length > 0 ? prices[0].value.centAmount / 100 : undefined
  const discountPrice =
    prices && prices.length > 0 && prices[0].discounted ? prices[0].discounted.value.centAmount / 100 : undefined

  const product: IProduct = {
    keyName: key,
    title,
    description,
    image,
    price,
    discountPrice,
    id,
  }

  return product
}
