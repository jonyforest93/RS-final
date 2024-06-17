import React, { useContext, useEffect, useState } from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'
import { createCart, getCartItems } from 'api/cart/getCartItems'
import { addCartItem } from 'api/cart/addItemToCart'
import { CART_KEY, localStorageService } from 'services/local-storage-service'
import { cartItemsContext } from 'services/Context'

import type { IProduct } from 'types/types'

export const ProductItem: React.FC<IProduct> = ({ ...props }) => {
  const [isButtonDisabled, setButtonDisabled] = useState(false)
  const { cartItems, setСartItems } = useContext(cartItemsContext)

  useEffect(() => {
    const cartId = localStorageService.getItem(CART_KEY)
    if (cartId) {
      getCartItems(cartId)
        .then(res => {
          res.lineItems.find(el => el.productKey === props.keyName) ? setButtonDisabled(true) : setButtonDisabled(false)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }, [])

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    event.stopPropagation()
    event.preventDefault()

    setButtonDisabled(true)
    setСartItems(cartItems + 1)

    const cartKey = localStorageService.getItem(CART_KEY)
    try {
      if (cartKey) {
        await addCartItem({ productId: props.id, productKey: props.keyName ? props.keyName : '', quantity: 1 }, cartKey)

        return
      }
      const { id } = await createCart()
      if (typeof id === 'string') {
        localStorageService.setItem(CART_KEY, id)
        await addCartItem({ productId: props.id, productKey: props.keyName ? props.keyName : '', quantity: 1 }, id)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="mb-[60px] w-[255px]">
      <div className="content mb-[30px] flex w-[255px] cursor-pointer flex-col items-start justify-start gap-3 overflow-hidden">
        <img src={props.image} alt={props.title} width="255px" height="335px" />
        <div>
          <h3 className="card-title truncate">{props.title}</h3>
          {props.discountPrice ? (
            <div className="flex gap-1">
              <h3 className="card-title">${props.discountPrice}</h3>
              <h3 className="text-white line-through">${props.price}</h3>
            </div>
          ) : (
            <h3 className="card-title">${props.price}</h3>
          )}
          <h3 className="card-title mt-2">Description</h3>
          <p className="basic-text three-lines">{props.description}</p>
        </div>
      </div>
      <BaseButton variant="product-cart" onClick={handleClick} disabled={isButtonDisabled}>
        Add to cart
      </BaseButton>
    </div>
  )
}
