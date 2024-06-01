import BaseButton from 'components/shared/BaseButton/BaseButton'
import { addDotPrice } from 'utils/addDotPrice'

import type { IproductInfo } from 'types/types'

export const ProductInformation = ({ name, description, price, discount }: IproductInfo): JSX.Element => {
  const formatPrice = addDotPrice(price)
  const formatDiscount = addDotPrice(discount)
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
      <div className="w-[70%] max-lg:w-[80%]">
        <BaseButton variant="basket">Add to cart</BaseButton>
      </div>
    </div>
  )
}
