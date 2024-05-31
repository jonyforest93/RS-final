import { useState } from 'react'

import ArrowIcon from 'components/shared/icons/ArrowIcon'

import { ModalProduct } from './ProductModal'

interface IproductInfo {
  name: string
  description: string
  price: number
  discount: number | undefined
}
interface SliderProps {
  slides: string[]
  currentImg: number
  setCurrentImg: React.Dispatch<React.SetStateAction<number>>
  props: IproductInfo
}

const Slider = ({ slides, currentImg, setCurrentImg, ...props }: SliderProps): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState('')
  const [isDisplayModal, setIsDisplayModal] = useState(false)
  const previousSlide = (): void => {
    if (currentImg === slides.length - 1) {
      setCurrentImg(currentImg - 1)
    }
  }
  const nextSlide = (): void => {
    if (currentImg === 0) {
      setCurrentImg(currentImg + 1)
    }
  }

  const handleImageClick = (url: string): void => {
    setSelectedImage(url)
    setIsDisplayModal(true)
  }

  return (
    <div className="relative overflow-hidden ">
      <div
        className={` duration-40 flex h-[450px] transition ease-out `}
        style={{ transform: `translate(-${currentImg * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <img
            className="cursor-pointer object-cover"
            src={slide}
            key={i}
            alt={props.props.name}
            onClick={() => {
              handleImageClick(slide)
            }}
          />
        ))}
      </div>

      <button
        className="absolute top-1/2 transform transition-transform duration-100 hover:scale-150"
        onClick={previousSlide}
        type="button"
      >
        <ArrowIcon rotate={0}></ArrowIcon>
      </button>
      <button
        className="absolute right-[0px] top-1/2 transform transition-transform duration-100 hover:scale-150"
        onClick={nextSlide}
        type="button"
      >
        <ArrowIcon rotate={180}></ArrowIcon>
      </button>

      <div className="absolute bottom-0 flex w-full justify-center gap-2 py-4">
        {slides.map((_, i) => (
          <div key={i} className={`h-3 w-3 rounded-full  ${i === currentImg ? 'bg-white' : 'bg-gray-500'}`}></div>
        ))}
      </div>
      <ModalProduct
        isDisplayModal={isDisplayModal}
        selectedImg={selectedImage}
        setIsDisplayModal={setIsDisplayModal}
      ></ModalProduct>
    </div>
  )
}

export default Slider
