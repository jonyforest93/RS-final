import { type Dispatch, type SetStateAction, useEffect, useState } from 'react'
import { useContext } from 'react'

import { CART_KEY, localStorageService } from 'services/local-storage-service'
import { deleteCartItem } from 'api/cart/deleteCartItem'
import { changeCartItemQuantity } from 'api/cart/changeCartItemQuantity'
import { cartItemsContext } from 'services/Context'
import useDebounce from 'hooks/useDebounce'

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
        setTotalPrice(prev => prev - price * quantity)
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
      <div className="flex w-[350px] gap-5">
        <img src={imageUrl ? imageUrl[0].url : ''} alt="productImage" className="w-[120px]" />
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <h2 className="w-[100px]">{name['en-US']}</h2>
            <p className="font-extrabold text-turquoiseEllipse">{`${(price / 100) * itemQuantity} USD`}</p>
          </div>
          <div className="flex  items-center gap-5">
            <div className="flex h-[30px] w-[100px] items-center justify-center gap-[22px] border border-gray-600">
              <button type="button" onClick={decreaseItems}>
                -
              </button>
              <p>{itemQuantity}</p>
              <button type="button" onClick={increaseItems}>
                +
              </button>
            </div>
            <button type="button" onClick={handleDeleteClick} className="link">
              Delete
            </button>
          </div>
        </div>
      </div>
    )
  }
  return
}
