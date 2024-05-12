import React from 'react'

import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'basket' | 'login'
  icon?: React.ReactNode
}

const BaseButton: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, ...props }) => {
  const buttonStyles: Record<string, string> = {
    primary:
      'text-btnText hover:bg-secondary bg-primary px-[50px] py-[16px] text-xs font-bold uppercase tracking-wider hover:text-white',
    basket:
      'hover:bg-primary hover:text-btnText border bg-transparent px-[93px] py-[16px] text-xs font-bold uppercase tracking-wider text-white hover:border-none',
    login:
      'relative z-20 text-btnText hover:bg-secondary bg-primary px-[50px] py-[16px] text-xs font-bold uppercase tracking-wider hover:text-white mt-[20px] max-w-[55%]',
  }

  const combinedClassName = `${buttonStyles[variant]} btn`

  return (
    <button type="button" className={combinedClassName} {...props}>
      {icon ? <span className="btn-icon">{icon}</span> : null}
      {children}
    </button>
  )
}

export default BaseButton
