import React, { useState } from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'

interface ErrorModalProps {
  errorMessage: string
  onErrorMessageChange: (value: string) => void
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ errorMessage, onErrorMessageChange }) => {
  const [isButtonClicked, setIsButtonClicked] = useState(false)

  const handleButtonClick = (): void => {
    setIsButtonClicked(true)
    onErrorMessageChange('')
  }
  return (
    <div
      className={`fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-80  transition duration-100 ${isButtonClicked ? 'hidden opacity-0' : 'opacity-1 visible'}`}
    >
      <div
        className={`  flex h-1/4 w-1/4  flex-col items-center justify-center gap-10 bg-[#783939] p-4 font-osvald text-xl text-white`}
      >
        <span className="">{errorMessage}</span>
        <BaseButton variant="basket" onClick={handleButtonClick}>
          Ok
        </BaseButton>
      </div>
    </div>
  )
}
