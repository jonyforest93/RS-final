import { useEffect, useState } from 'react'

import { getCartItems } from 'api/cart/getCartItems'
import { CART_KEY, localStorageService } from 'services/local-storage-service'
import { Loading } from 'components/Loading'

import { CartPage } from './CartPage'

import type { LineItem } from '@commercetools/platform-sdk'

export const CartWrapper: React.FC = () => {
  const [products, setProducts] = useState<LineItem[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [discountPrice, setDiscountPrice] = useState<number>(0)

  useEffect(() => {
    const cartKey = localStorageService.getItem(CART_KEY)
    if (!cartKey) {
      setLoaded(true)
      return
    }

    getCartItems(cartKey)
      .then(res => {
        setDiscountPrice(res.discountOnTotalPrice ? res.discountOnTotalPrice.discountedAmount.centAmount : 0)
        setProducts(res.lineItems)
        setTotalPrice(res.totalPrice.centAmount)
        setLoaded(true)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  if (loaded) {
    return (
      <CartPage
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        products={products}
        setProducts={setProducts}
        discountPrice={discountPrice}
        setDiscountPrice={setDiscountPrice}
      />
    )
  }
  return <Loading />
}
