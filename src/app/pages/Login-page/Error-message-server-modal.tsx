import React from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'

interface ErrorModalProps {
  errorMessage: string
  onErrorMessageChange?: (value: string) => void
  isDisplayed: boolean
  setDisplay: (param: boolean) => void
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, isDisplayed, setDisplay }) => {
  const handleButtonClick = (): void => {
    setDisplay(false)
  }
  return (
    <div
      className={`${isDisplayed ? 'flex' : 'hidden'} fixed left-0 top-0 z-20 h-full w-full items-center justify-center bg-gray-800 bg-opacity-80  transition duration-100 `}
    >
      <div
        className={`flex h-[200px] flex-col items-center justify-center gap-10 bg-[#783939] p-10 font-osvald text-xl text-white`}
      >
        <span className="">{errorMessage}</span>
        <BaseButton variant="basket" onClick={handleButtonClick}>
          Ok
        </BaseButton>
      </div>
    </div>
  )
}
