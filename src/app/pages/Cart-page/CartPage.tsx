import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { getCartItems } from 'api/cart/getCartItems'
import { CART_KEY, localStorageService } from 'services/local-storage-service'
import BaseButton from 'components/shared/BaseButton/BaseButton'
import { clearCart } from 'api/cart/clearCart'
import { cartItemsContext } from 'services/Context'

import { CartItem } from './components/CartItem'

import type { LineItem } from '@commercetools/platform-sdk'

export const CartPage: React.FC = () => {
  const [products, setProducts] = useState<LineItem[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const { setСartItems } = useContext(cartItemsContext)
  useEffect(() => {
    const cartKey = localStorageService.getItem(CART_KEY)
    if (!cartKey) {
      return
    }
    getCartItems(cartKey)
      .then(res => {
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
        setTotalPrice(0)
        setСartItems(0)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <main className="relative flex w-[100%] flex-grow flex-col items-center justify-center gap-10 overflow-hidden px-3 pb-10 text-white">
      <img src="cartPage/imageLeft.png" alt="" className="absolute left-0 top-0 z-0" />
      <img src="cartPage/imageRight.png" alt="" className="absolute right-0 top-0 z-0" />
      <img src="cartPage/imageRightTwo.png" alt="" className="absolute right-[-80px] top-0 z-0" />
      <h1 className="title relative z-10 ">Cart</h1>
      <div className=" relative z-10 flex max-w-[1440px] flex-wrap items-center justify-center gap-10">
        {products.map(product => {
          return (
            <CartItem
              name={product.name}
              id={product.id}
              price={
                product.price.discounted ? product.price.discounted.value.centAmount : product.price.value.centAmount
              }
              quantity={product.quantity}
              variant={product.variant}
              setProducts={setProducts}
              setTotalPrice={setTotalPrice}
              key={product.id}
            />
          )
        })}
      </div>
      {totalPrice ? (
        <>
          <div className="mt-10">
            <p className="label text-[24px]">{`Total price:  ${totalPrice / 100} USD`}</p>
          </div>
          <BaseButton onClick={handleCartClearClick}>Clear Cart</BaseButton>
        </>
      ) : (
        <div className="flex flex-col items-center justify-between gap-10 text-center">
          <h2 className="title s text-[40px]">Your cart is currently empty</h2>
          <NavLink to="/catalog">
            <p className="link ">You can go to the catalog page to add products to your cart</p>
          </NavLink>
          <img src="cartPage/signature.png" alt="signature" />
        </div>
      )}
    </main>
  )
}
