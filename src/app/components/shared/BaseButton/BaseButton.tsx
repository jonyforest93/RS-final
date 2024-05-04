import React from 'react'

import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  icon?: React.ReactNode
}

const BaseButton: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, ...rest }) => {
  const buttonStyles = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-black',
  }

  const combinedClassName = `${buttonStyles[variant]} btn`

  return (
    <button type="button" className={combinedClassName} {...rest}>
      {icon ? <span className="btn-icon">{icon}</span> : null}
      {children}
    </button>
  )
}

export default BaseButton
