import { useState } from 'react'

import Slider from './Slider'
const slides = ['/images/productPageImg/10.1.jpg', '/images/productPageImg/10.2.jpg']
export const Product: React.FC = () => {
  const [current, setCurrent] = useState(0)

  return (
    <div className=" mt-[150px] flex items-center justify-center gap-7 px-2">
      <div className="flex flex-col gap-5 max-lg:hidden">
        {slides.map((slide, i) => (
          <img
            className={`h-[185px] w-[160px] cursor-pointer ${current === i ? '' : 'blur-[2px]'}`}
            src={slide}
            key={i}
            onClick={() => {
              setCurrent(i)
            }}
          />
        ))}
      </div>
      <div className=" relative    flex w-[350px] ">
        <Slider slides={slides} current={current} setCurrent={setCurrent} />
      </div>
    </div>
  )
}
