import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useContext } from 'react'

import { CART_KEY, localStorageService } from 'services/local-storage-service'
import { deleteCartItem } from 'api/cart/deleteCartItem'
import { changeCartItemQuantity } from 'api/cart/changeCartItemQuantity'
import { cartItemsContext } from 'services/Context'
import useDebounce from 'hooks/useDebounce'
import BaseButton from 'components/shared/BaseButton/BaseButton'

import type { LineItem, LocalizedString, ProductVariant } from '@commercetools/platform-sdk'

interface CartItemProps {
  price: number
  quantity: number
  variant: ProductVariant
  id: string
  name: LocalizedString
  setProducts: Dispatch<SetStateAction<LineItem[]>>
  setTotalPrice: Dispatch<SetStateAction<number>>
}

export const CartItem: React.FC<CartItemProps> = ({
  price,
  quantity,
  variant,
  setProducts,
  setTotalPrice,
  id,
  name,
}) => {
  const cartId = localStorageService.getItem(CART_KEY)
  const imageUrl = variant.images
  const [itemQuantity, setItemQuantity] = useState<number>(quantity)
  const { cartItems, setСartItems } = useContext(cartItemsContext)

  const handleDeleteClick = async (): Promise<void> => {
    if (cartId) {
      try {
        await deleteCartItem(cartId, id)
        setProducts(prev => prev.filter(element => element.id !== id))
        setTotalPrice(prev => prev - price * itemQuantity)
        setСartItems(cartItems - 1)
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    if (itemQuantity < 1) {
      setСartItems(cartItems - 1)
    }
  }, [itemQuantity])

  const increaseQuantity = async (): Promise<void> => {
    if (cartId) {
      try {
        await changeCartItemQuantity(cartId, id, itemQuantity)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const decreaseQuantity = async (): Promise<void> => {
    if (cartId) {
      try {
        await changeCartItemQuantity(cartId, id, itemQuantity)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const debouncedIncreaseQuantity = useDebounce(increaseQuantity, 500)
  const debouncedDecreaseQuantity = useDebounce(decreaseQuantity, 500)

  const increaseItems = (): void => {
    setItemQuantity(prev => prev + 1)
    setTotalPrice(prev => prev + price)
    debouncedIncreaseQuantity()
  }
  const decreaseItems = (): void => {
    setItemQuantity(prev => prev - 1)
    setTotalPrice(prev => prev - price)
    debouncedDecreaseQuantity()
  }

  if (itemQuantity) {
    return (
      <div className="z-20 flex flex-col gap-5">
        <div className="flex  gap-5">
          <img src={imageUrl ? imageUrl[0].url : ''} alt="productImage" className="w-[150px]" />
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <h2 className="w-[150px]">{name['en-US']}</h2>
              <div className="flex gap-1 text-[14px]"></div>
            </div>
            <div className="flex  items-center gap-5">
              <BaseButton variant="cart" onClick={handleDeleteClick}>
                Delete
              </BaseButton>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <p className="text-[14px] font-bold text-white">{`Individual: ${price / 100} $`}</p>
          <div className="flex h-[30px] w-[100px] items-center justify-center gap-[22px] border border-gray-600">
            <button type="button" onClick={decreaseItems}>
              -
            </button>
            <p>{itemQuantity}</p>
            <button type="button" onClick={increaseItems}>
              +
            </button>
          </div>
          <p className="text-[14px] font-bold text-white">{`Total: ${(price / 100) * itemQuantity} $`}</p>
        </div>
      </div>
    )
  }
  return
}
