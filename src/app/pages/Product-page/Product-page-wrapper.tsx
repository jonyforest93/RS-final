import { useEffect, useState } from 'react'

import { getProductByKey } from 'api/getProductByKey'

import { ProductPage } from './Product-page'

import type { IproductData } from 'types/types'
export const ProductWrapper: React.FC = () => {
  const [productData, setProductData] = useState<IproductData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProductByKey('peonies-with-gypsophila')
      .then(res => {
        const dataProduct = res.masterData.current
        const priceProduct = dataProduct.masterVariant.prices?.[0]
        if (dataProduct.masterVariant.images && dataProduct.description && priceProduct) {
          const images = dataProduct.masterVariant.images.map(image => image.url)
          setProductData({
            slides: images,
            name: dataProduct.name['en-US'],
            description: dataProduct.description['en-US'],
            price: priceProduct.value.centAmount,
            discount: priceProduct.discounted?.value.centAmount,
          })
        }
        setIsLoading(false)
      })
      .catch(err => {
        if (err instanceof Error) {
          console.error(err.message)
        }
      })
  }, [])

  if (isLoading) {
    return <h2 className="title mt-60 text-center text-white">Loading...</h2>
  }

  if (!productData) {
    return <h2 className="title mt-60 text-center text-white">Sorry, product data was not found</h2>
  }
  return <ProductPage {...productData} />
}
