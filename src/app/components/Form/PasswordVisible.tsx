import EyeSlashIcon from 'components/shared/icons/EyeSlashIcon'
import EyeIcon from 'components/shared/icons/EyeIcon'

import type { FC } from 'react'

interface IPasswordVisibleProps {
  isPassword: boolean
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>
}

const PasswordVisible: FC<IPasswordVisibleProps> = ({ isPassword, setShowPassword }) => {
  const passwordVisibility = (): void => {
    setShowPassword(!isPassword)
  }

  return (
    <div className="absolute bottom-6 right-5 h-5 w-5 cursor-pointer " onClick={passwordVisibility}>
      {isPassword ? <EyeSlashIcon /> : <EyeIcon />}
    </div>
  )
}

export default PasswordVisible
