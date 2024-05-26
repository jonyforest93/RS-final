import { useState } from 'react'

import { addDotPrice } from 'utils/addDotPrice'
import BaseButton from 'components/shared/BaseButton/BaseButton'

import Slider from './Slider'

import type { IproductData } from 'types/types'

export const ProductComponent: React.FC<IproductData> = ({
  slides,
  name,
  description,
  price,
  discount,
}: IproductData) => {
  const [currentImg, setCurrentImg] = useState(0)
  const formatPrice = addDotPrice(price)
  const formatDiscount = addDotPrice(discount)
  return (
    <div className=" mt-[150px] flex items-center justify-center gap-7 px-2 max-lg:flex-col">
      <div className="flex flex-col gap-5 max-lg:hidden">
        {slides.map((slide, i) => (
          <img
            className={`h-[185px] w-[160px] cursor-pointer ${currentImg === i ? '' : 'blur-[2px]'}`}
            src={slide}
            key={i}
            onClick={() => {
              setCurrentImg(i)
            }}
          />
        ))}
      </div>
      <div className="relative flex w-[350px]">
        <Slider slides={slides} currentImg={currentImg} setCurrentImg={setCurrentImg} />
      </div>
      <div className="flex max-w-[430px] flex-col gap-5 max-lg:max-w-[350px]">
        <h3 className=" title text-[48px] max-lg:text-3xl">{name}</h3>
        <div className="flex gap-5">
          {discount ? <h3 className="list-title text-3xl max-lg:text-lg">{formatDiscount} $</h3> : ''}

          <h3
            className={`list-title text-3xl font-light ${discount ? 'text-[#555555] line-through' : ''}  max-lg:text-lg`}
          >
            {formatPrice} $
          </h3>
        </div>
        <div className="flex pb-16 max-lg:pb-7">
          <p className="basic-text ">{description}</p>
        </div>
        <div className="w-[70%]">
          <BaseButton variant="basket">Add to cart</BaseButton>
        </div>
      </div>
    </div>
  )
}
