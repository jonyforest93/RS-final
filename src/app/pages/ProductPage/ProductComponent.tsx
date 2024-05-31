import { useState } from 'react'

import Slider from './Slider'
import { ProductInformation } from './ProductInformation'

import type { IproductData } from 'types/types'

export const ProductComponent = ({ slides, ...props }: IproductData): JSX.Element => {
  const [currentImg, setCurrentImg] = useState(0)

  return (
    <div className=" mt-[150px] flex items-center justify-center gap-7 px-2 max-lg:flex-col">
      <div className="flex flex-col gap-5 max-lg:hidden">
        {slides.map((slide, i) => (
          <img
            className={`h-[185px] w-[160px] cursor-pointer ${currentImg === i ? '' : 'blur-[2px]'}`}
            src={slide}
            key={i}
            alt={props.name}
            onClick={() => {
              setCurrentImg(i)
            }}
          />
        ))}
      </div>
      <div className="relative flex w-[350px] ">
        <Slider slides={slides} currentImg={currentImg} setCurrentImg={setCurrentImg} props={props} />
      </div>
      <ProductInformation {...props} />
    </div>
  )
}
