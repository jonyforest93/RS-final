import { useEffect, useState } from 'react'

import { clearCart } from 'api/cart/clearCart'
import { getCartItems } from 'api/cart/getCartItems'
import { CART_KEY, localStorageService } from 'services/local-storage-service'
import { Loading } from 'components/Loading'

import { CartPage } from './CartPage'

import type { LineItem } from '@commercetools/platform-sdk'

export const CartWrapper: React.FC = () => {
  const [products, setProducts] = useState<LineItem[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    const cartKey = localStorageService.getItem(CART_KEY)
    if (!cartKey) {
      return
    }
    getCartItems(cartKey)
      .then(res => {
        setProducts(res.lineItems)
        setTotalPrice(res.totalPrice.centAmount)
        setLoaded(true)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  const handleCartClearClick = async (): Promise<void> => {
    setProducts([])
    const cartId = localStorageService.getItem(CART_KEY)
    if (cartId) {
      try {
        await clearCart(cartId, products)
        setTotalPrice(0)
      } catch (err) {
        console.error(err)
      }
    }
  }
  if (loaded) {
    return (
      <CartPage
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
        products={products}
        setProducts={setProducts}
        clearCart={handleCartClearClick}
      />
    )
  }
  return <Loading />
}
