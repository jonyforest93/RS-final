import { useState } from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'
import { clearCart } from 'api/cart/clearCart'
import { CART_KEY, localStorageService } from 'services/local-storage-service'
import { Modal } from 'components/modal/Modal'

import { CartItem } from './components/CartItem'
import { EmptyCart } from './components/EmptyCart'
import { CartImages } from './components/CartImages'

import type { LineItem } from '@commercetools/platform-sdk'

interface ICartPageProps {
  products: LineItem[]
  totalPrice: number
  setProducts: React.Dispatch<React.SetStateAction<LineItem[]>>
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>
}
interface ModalType {
  isDisplay: boolean
  message: string
}

const CART_MESSAGE_TEXT = 'Are you sure? This action will clear cart.'
export const CartPage: React.FC<ICartPageProps> = ({ products, totalPrice, setProducts, setTotalPrice }) => {
  const [modal, showModal] = useState<ModalType>({ isDisplay: false, message: '' })

  const handleCartClearClick = async (): Promise<void> => {
    setProducts([])
    const cartId = localStorageService.getItem(CART_KEY)

    if (cartId) {
      try {
        await clearCart(cartId, products)
        setTotalPrice(0)
        showModal({ isDisplay: false, message: '' })
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <main className="relative flex w-[100%] flex-grow flex-col items-center justify-center gap-10 overflow-hidden px-3 pb-10 text-white">
      <CartImages />
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
          <BaseButton
            onClick={() => {
              showModal({ isDisplay: true, message: CART_MESSAGE_TEXT })
            }}
          >
            Clear Cart
          </BaseButton>
        </>
      ) : (
        <EmptyCart />
      )}
      {modal.isDisplay ? (
        <Modal isDisplay={modal.isDisplay} bg={'black'}>
          {modal.message}
          <div className="flex justify-center gap-5">
            <BaseButton variant="modal" onClick={handleCartClearClick}>
              Yes
            </BaseButton>
            <BaseButton
              variant="modal"
              onClick={() => {
                showModal({ isDisplay: false, message: '' })
              }}
            >
              No
            </BaseButton>
          </div>
        </Modal>
      ) : null}
    </main>
  )
}
