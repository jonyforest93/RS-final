import { useEffect, useState } from 'react'

import CrossIcon from 'components/shared/icons/CrossIcon'
import ArrowIcon from 'components/shared/icons/ArrowIcon'
import { getProducts } from 'api/getProducts'
interface IModalProduct {
  isDisplayModal: boolean
  selectedImg: string
  setIsDisplayModal: (value: boolean) => void
}

export const ModalProduct = ({ isDisplayModal, selectedImg, setIsDisplayModal }: IModalProduct): JSX.Element | null => {
  const [productsImages, setProductsImages] = useState<string[]>()
  const [currentImg, setCurrentImg] = useState(0)

  const handleClouseModal = (): void => {
    setIsDisplayModal(false)
    setCurrentImg(0)
  }
  const previousSlide = (): void => {
    if (productsImages) {
      if (currentImg !== 0) {
        setCurrentImg(currentImg - 1)
      }
    }
  }
  const nextSlide = (): void => {
    if (productsImages) {
      if (currentImg !== productsImages.length - 1) {
        setCurrentImg(currentImg + 1)
      }
    }
  }
  useEffect(() => {
    getProducts()
      .then(res => {
        const productsImg = res.map(product => product.masterData.current.masterVariant.images?.[0].url ?? '')
        setProductsImages(productsImg)
      })
      .catch(err => {
        if (err instanceof Error) {
          console.error(err.message)
        }
      })
  }, [])

  if (!productsImages) {
    return null
  }

  return (
    <div
      className={`${isDisplayModal ? 'flex' : 'hidden'} fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-80  transition duration-100 `}
    >
      <div className="relative flex w-[640px] px-2 max-lg:w-[500px] max-md:w-[380px] ">
        <div className="relative overflow-hidden  ">
          <div
            style={{ transform: `translate(-${currentImg * 100}%)` }}
            className=" duration-40 flex h-[640px] transition ease-out max-lg:h-[500px] max-md:h-[380px]"
          >
            {[selectedImg, ...productsImages].map((url, i) => (
              <img key={i} className=" object-cover" src={url}></img>
            ))}
          </div>

          <button
            onClick={handleClouseModal}
            type="button"
            className="absolute right-2 top-2 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <CrossIcon />
          </button>
          <button
            className="absolute top-1/2 transform transition-transform duration-100 hover:scale-150"
            onClick={previousSlide}
            type="button"
          >
            <ArrowIcon rotate={0}></ArrowIcon>
          </button>
          <button
            className="absolute right-[4px] top-1/2 transform transition-transform duration-100 hover:scale-150"
            onClick={nextSlide}
            type="button"
          >
            <ArrowIcon rotate={180}></ArrowIcon>
          </button>
        </div>
      </div>
    </div>
  )
}
