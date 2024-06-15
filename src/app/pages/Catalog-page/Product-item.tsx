import React from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'
import { createCart } from 'api/cart/getCartItems'
import { addCartItem } from 'api/cart/addItemToCart'
import { CART_KEY, localStorageService } from 'services/local-storage-service'

import type { IProduct } from 'types/types'

export const ProductItem: React.FC<IProduct> = ({ ...props }) => {
  const handleClick = async (): Promise<void> => {
    const cartKey = localStorageService.getItem(CART_KEY)
    try {
      if (cartKey) {
        await addCartItem({ productId: props.id, productKey: props.keyName ? props.keyName : '', quantity: 1 }, cartKey)

        return
      }
      const cartResponse = await createCart()
      if (cartResponse.body?.id) {
        localStorageService.setItem(CART_KEY, cartResponse.body.id)
      }
      await addCartItem(
        { productId: props.id, productKey: props.keyName ? props.keyName : '', quantity: 1 },
        cartKey || '',
      )
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
      <BaseButton variant="product-cart" onClick={handleClick}>
        Add to cart
      </BaseButton>
    </div>
  )
}
