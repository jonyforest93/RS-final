import { NavLink } from 'react-router-dom'

import { setActive } from 'utils/setAcitve'

import type { FC } from 'react'

export const Header: FC = () => {
  return (
    <header className="z-[10] flex items-center justify-between px-[100px] font-bold">
      <h1 className="text-xl">Kex Shop</h1>
      <div className="flex  gap-[75px]">
        <NavLink to="/" className={setActive}>
          Home
        </NavLink>
        <NavLink className={setActive} to="/login">
          Login
        </NavLink>
        <NavLink className={setActive} to="/registration">
          Registration
        </NavLink>
      </div>
      <div></div>
    </header>
  )
}
