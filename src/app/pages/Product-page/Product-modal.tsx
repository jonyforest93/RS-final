import CrossIcon from 'components/shared/icons/CrossIcon'

interface IModalProduct {
  isDisplayModal: boolean
  selectedImg: string
  setIsDisplayModal: (value: boolean) => void
}

export const ModalProduct: React.FC<IModalProduct> = ({
  isDisplayModal,
  selectedImg,
  setIsDisplayModal,
}: IModalProduct) => {
  const handleClouseModal = (): void => {
    setIsDisplayModal(false)
  }

  return (
    <div
      className={`${isDisplayModal ? 'flex' : 'hidden'} fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-80  transition duration-100 `}
    >
      <div className="relative  max-w-[630px] overflow-hidden px-2 max-lg:max-w-[500px] max-md:max-w-[380px]">
        <img className="object-cover" src={selectedImg}></img>
        <button
          onClick={handleClouseModal}
          type="button"
          className="absolute right-4 top-2 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-hide="popup-modal"
        >
          <CrossIcon />
        </button>
      </div>
    </div>
  )
}
