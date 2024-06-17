import { useContext, useState } from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'
import { clearCart } from 'api/cart/clearCart'
import { cartItemsContext } from 'services/Context'
import { CART_KEY, localStorageService } from 'services/local-storage-service'
import { Modal } from 'components/modal/Modal'
import { addPromocode } from 'api/cart/addPromocode'

import { CartItem } from './components/CartItem'
import { EmptyCart } from './components/EmptyCart'
import { CartImages } from './components/CartImages'

import type { ChangeEventHandler, FormEvent } from 'react'
import type { LineItem } from '@commercetools/platform-sdk'

interface ICartPageProps {
  products: LineItem[]
  totalPrice: number
  setProducts: React.Dispatch<React.SetStateAction<LineItem[]>>
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>
  setDiscountPrice: React.Dispatch<React.SetStateAction<number>>
  discountPrice: number
}
interface ModalType {
  isDisplay: boolean
  message: string
}

const CART_MESSAGE_TEXT = 'Are you sure? This action will clear cart.'
export const CartPage: React.FC<ICartPageProps> = ({
  products,
  totalPrice,
  setProducts,
  setTotalPrice,
  setDiscountPrice,
  discountPrice,
}) => {
  const [modal, showModal] = useState<ModalType>({ isDisplay: false, message: '' })
  const { setСartItems } = useContext(cartItemsContext)
  const [inputValue, setInputValue] = useState<string>('')

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    setInputValue(e.target.value)
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()
    addPromocode(inputValue)
      .then(res => {
        if (res?.body) {
          setTotalPrice(res.body.totalPrice.centAmount)
          setDiscountPrice(res.body.discountOnTotalPrice?.discountedAmount.centAmount as number)
          setInputValue('')
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleCartClearClick = async (): Promise<void> => {
    setProducts([])

    const cartId = localStorageService.getItem(CART_KEY)

    if (cartId) {
      try {
        await clearCart(cartId, products)
        setTotalPrice(0)
        setСartItems(0)
        showModal({ isDisplay: false, message: '' })
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <main className="relative flex w-[100%] flex-grow flex-col items-center justify-center gap-10 overflow-hidden px-3 pb-10 text-white">
      <CartImages />
      <h1 className="title z-100 relative  mt-20">Cart</h1>
      <div className="z-100 relative flex max-w-[1440px] flex-wrap items-center justify-center gap-10">
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

      {totalPrice > 0 ? (
        <>
          <div className="mt-10 flex">
            <p className="label text-[24px]">{`Total price:  $${totalPrice / 100} `}</p>
            {discountPrice ? (
              <p className="text-[13px] line-through">{`$${(totalPrice + discountPrice) / 100}`}</p>
            ) : null}
          </div>
          <form className="relative z-20 flex flex-col items-center gap-5" onSubmit={handleSubmit}>
            <div className="flex  items-center gap-5">
              <label htmlFor="promocode" className="label h-8">
                Promocode
              </label>
              <input
                type="text"
                name="promocode"
                className="w-25 input h-7  p-1"
                value={inputValue}
                onChange={handleInputChange}
              />
              <BaseButton type="submit" variant="promocode">
                Apply
              </BaseButton>
            </div>
          </form>
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
