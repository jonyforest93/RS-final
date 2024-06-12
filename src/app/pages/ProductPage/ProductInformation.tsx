import { useEffect, useState } from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'
import { addDotPrice } from 'utils/addDotPrice'
import { CART_KEY, localStorageService } from 'services/local-storage-service'
import { createCart, getCartItems } from 'api/cart/getCartItems'
import { addCartItem } from 'api/cart/addItemToCart'
import { deleteCartItem } from 'api/cart/deleteCartItem'
import { Modal } from 'components/modal/Modal'

import type { LineItem } from '@commercetools/platform-sdk'
import type { IproductInfo } from 'types/types'

export const ProductInformation = ({ name, description, price, discount, id, keyName }: IproductInfo): JSX.Element => {
  const [isProductIncart, setProductIncart] = useState<boolean>()
  const [productIdInCart, setProductIdInCart] = useState('')
  const [isDisplayModal, setDisplayModal] = useState(false)
  const formatPrice = addDotPrice(price)
  const formatDiscount = addDotPrice(discount)

  async function handleDeleteAndAddCartItem(): Promise<void> {
    const cartKey = localStorageService.getItem(CART_KEY)
    if (!cartKey) {
      return
    }
    try {
      if (isProductIncart) {
        await deleteCartItem(cartKey, productIdInCart)
        setProductIncart(false)
        setDisplayModal(true)
        setTimeout(() => {
          setDisplayModal(false)
        }, 2000)
      } else {
        await addCartItem({ productId: id, productKey: keyName || '', quantity: 1 }, cartKey)
        setProductIncart(true)
      }
    } catch (err) {
      console.error(err)
    }
  }
  const checkProductInCart = (productsCart: LineItem[]): void => {
    productsCart.forEach(product => {
      product.productKey === keyName ? setProductIncart(true) : setProductIncart(false)
      setProductIdInCart(product.id)
    })
  }

  useEffect(() => {
    if (!localStorageService.getItem(CART_KEY)) {
      createCart()
        .then(res => {
          if (res.body?.id) {
            localStorageService.setItem(CART_KEY, res.body.id)
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [])

  useEffect(() => {
    const cartKey = localStorageService.getItem(CART_KEY)
    if (!cartKey) {
      return
    }
    getCartItems(cartKey)
      .then(res => {
        checkProductInCart(res.lineItems)
      })
      .catch(err => {
        console.error(err)
      })
  }, [isProductIncart])

  return (
    <div className="flex max-w-[430px] flex-col gap-5 max-lg:max-w-[350px]">
      <h3 className=" title text-[48px] max-lg:text-3xl">{name}</h3>
      <div className="flex gap-5">
        {discount ? <h3 className="list-title text-3xl max-lg:text-lg">{formatDiscount} $</h3> : ''}
        <h3
          className={`list-title text-3xl  ${discount ? 'font-light text-[#555555] line-through' : ''}  max-lg:text-lg`}
        >
          {formatPrice} $
        </h3>
      </div>
      <div className="flex pb-16 max-lg:pb-7">
        <p className="basic-text ">{description}</p>
      </div>
      <div className=" w-[80%] max-lg:m-auto max-lg:w-[80%]">
        <BaseButton variant="basket" onClick={handleDeleteAndAddCartItem}>
          {isProductIncart ? 'remove from cart' : 'Add to cart'}
        </BaseButton>
      </div>
      <Modal isDisplay={isDisplayModal} bg={'red-300'}>
        Product removed from cart
      </Modal>
    </div>
  )
}
