import type { FC } from 'react'

interface IPasswordVisibleProps {
  isPassword: boolean
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}

const PasswordVisible: FC<IPasswordVisibleProps> = ({ isPassword, setShowPassword }) => {
  const passwordVisibility = (): void => {
    setShowPassword(!isPassword)
  }

  return <div className="absolute bottom-6 right-5 h-5 w-5 cursor-pointer bg-black" onClick={passwordVisibility}></div>
}

export default PasswordVisible
