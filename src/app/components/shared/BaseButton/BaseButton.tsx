import React from 'react'

import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'basket' | 'login' | 'edit' | 'product-cart' | 'modal' | 'promocode' | 'cart'
  icon?: React.ReactNode
}

const BaseButton: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, ...props }) => {
  const buttonStyles: Record<string, string> = {
    'product-cart':
      'hover:bg-primary hover:text-btnText border bg-transparent py-[16px] text-xs font-bold uppercase w-full tracking-wider text-white  hover:border-inherit',
    primary:
      'text-btnText hover:bg-secondary bg-primary px-[50px] py-[16px] text-xs font-bold uppercase tracking-wider hover:text-white',
    basket:
      'hover:bg-primary hover:text-btnText border bg-transparent px-[93px] py-[16px] text-xs font-bold uppercase tracking-wider text-white  hover:border-inherit',
    login:
      'relative z-20 text-btnText hover:bg-secondary bg-primary px-[50px] py-[16px] text-xs font-bold uppercase tracking-wider hover:text-white mt-[20px] max-w-[55%]',
    edit: 'hover:bg-primary hover:text-btnText border bg-transparent px-[93px] py-[16px] text-xs font-bold uppercase tracking-wider text-white hover:border-none text-[#97bdf0]',
    modal:
      'text-btnText hover:bg-secondary bg-primary px-[25px] py-[10px] text-xs font-bold uppercase tracking-wider hover:text-white',
    promocode:
      'text-btnText hover:bg-secondary bg-primary px-[15px] py-[7px] text-xs font-bold uppercase tracking-wider hover:text-white',
    cart: 'hover:bg-primary hover:text-btnText border bg-transparent px-[15px] py-[7px] text-xs font-bold uppercase tracking-wider text-white  hover:border-inherit',
  }

  const combinedClassName = `${buttonStyles[variant]} btn flex justify-center`

  return (
    <button type="button" className={combinedClassName} {...props}>
      {icon ? <span className="btn-icon">{icon}</span> : null}
      {children}
    </button>
  )
}

export default BaseButton
