import BaseButton from 'components/shared/BaseButton/BaseButton'

import { CartItem } from './components/CartItem'
import { EmptyCart } from './components/EmptyCart'

import type { LineItem } from '@commercetools/platform-sdk'

interface ICartPageProps {
  products: LineItem[]
  totalPrice: number
  clearCart: () => Promise<void>
  setProducts: React.Dispatch<React.SetStateAction<LineItem[]>>
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>
}
export const CartPage: React.FC<ICartPageProps> = ({ products, totalPrice, clearCart, setProducts, setTotalPrice }) => {
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
          <BaseButton onClick={clearCart}>Clear Cart</BaseButton>
        </>
      ) : (
        <EmptyCart></EmptyCart>
      )}
    </main>
  )
}
