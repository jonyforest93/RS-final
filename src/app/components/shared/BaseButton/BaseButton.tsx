import React from 'react'

import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  icon?: React.ReactNode
}

const BaseButton: React.FC<ButtonProps> = ({ children, variant = 'primary', icon, ...props }) => {
  const buttonStyles: Record<string, string> = {
    primary: 'text-semibold border-none bg-primary px-[36px] py-[12px] text-lg text-white',
    showMore: 'text-semibold border border-primary px-[74px] py-[12px] text-lg text-primary',
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
