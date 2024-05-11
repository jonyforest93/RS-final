import React from 'react'

import type { FC } from 'react'

interface LinkProps {
  href: string
  children: React.ReactNode
}

const Link: FC<LinkProps> = ({ href, children }) => {
  return (
    <a className="link  mt-2 block text-start underline" href={href}>
      {children}
    </a>
  )
}

export default Link
