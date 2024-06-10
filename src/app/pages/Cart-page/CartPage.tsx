import { useEffect, useState } from 'react'

import { getCartItems } from 'api/cart/getCartItems'
import { CART_KEY, localStorageService } from 'services/local-storage-service'
import BaseButton from 'components/shared/BaseButton/BaseButton'
import { clearCart } from 'api/cart/clearCart'

import { CartItem } from './components/CartItem'

import type { LineItem } from '@commercetools/platform-sdk'

export const CartPage: React.FC = () => {
  const [products, setProducts] = useState<LineItem[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    const cartKey = localStorageService.getItem(CART_KEY)
    if (!cartKey) {
      return
    }
    getCartItems(cartKey)
      .then(res => {
        console.log(res)
        setProducts(res.lineItems)
        setTotalPrice(res.totalPrice.centAmount)
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
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <main className="relative flex w-[100%] flex-grow flex-col items-center justify-between gap-5 overflow-hidden px-3 pb-10 text-white">
      <img src="cartPage/imageLeft.png" alt="" className="absolute left-0 " />
      <img src="cartPage/imageRight.png" alt="" className="absolute right-0" />
      <img src="cartPage/imageRightTwo.png" alt="" className="absolute right-[-80px]" />
      <h1 className="title mt-28">Your Cart</h1>
      <div className="flex max-w-[1440px] flex-wrap items-center justify-center gap-10">
        {products.map(product => {
          return <CartItem {...product} key={product.id} />
        })}
      </div>
      <BaseButton onClick={handleCartClearClick}>Clear Cart</BaseButton>
      <div className="mt-10">
        <p className="label text-[24px]">{`Total price:  ${totalPrice / 100} USD`}</p>
      </div>
    </main>
  )
}
