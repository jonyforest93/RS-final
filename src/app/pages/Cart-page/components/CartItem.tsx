import { type Dispatch, type SetStateAction, useState } from 'react'

import { CART_KEY, localStorageService } from 'services/local-storage-service'
import { deleteCartItem } from 'api/cart/deleteCartItem'
import { changeCartItemQuantity } from 'api/cart/changeCartItemQuantity'

import type { CentPrecisionMoney, LineItem, LocalizedString, ProductVariant } from '@commercetools/platform-sdk'

interface CartItemProps {
  price: CentPrecisionMoney
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

  const handleDeleteClick = async (): Promise<void> => {
    if (cartId) {
      try {
        await deleteCartItem(cartId, id)
        setProducts(prev => prev.filter(element => element.id !== id))
        setTotalPrice(prev => prev - price.centAmount * quantity)
      } catch (err) {
        console.error(err)
      }
    }
  }
  const increaseQuantity = async (): Promise<void> => {
    setItemQuantity(prev => prev + 1)
    if (cartId) {
      try {
        await changeCartItemQuantity(cartId, id, itemQuantity + 1)
        setTotalPrice(prev => prev + price.centAmount)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const decreaseQuantity = async (): Promise<void> => {
    setItemQuantity(prev => prev - 1)
    if (cartId) {
      try {
        await changeCartItemQuantity(cartId, id, itemQuantity - 1)
        setTotalPrice(prev => prev - price.centAmount)
      } catch (err) {
        console.error(err)
      }
    }
  }
  return (
    <div className="flex w-[350px] gap-5">
      <img src={imageUrl ? imageUrl[0].url : ''} alt="productImage" className="w-[120px]" />
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <h2 className="w-[100px]">{name['en-US']}</h2>
          <p className="font-extrabold text-turquoiseEllipse">{`${(price.centAmount / 100) * itemQuantity} USD`}</p>
        </div>
        <div className="flex  items-center gap-5">
          <div className="flex h-[30px] w-[100px] items-center justify-center gap-[22px] border border-gray-600">
            <button type="button" onClick={decreaseQuantity}>
              -
            </button>
            <p>{itemQuantity}</p>
            <button type="button" onClick={increaseQuantity}>
              +
            </button>
          </div>
          <button type="button" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
