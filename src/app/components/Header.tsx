import React from 'react'
import { NavLink } from 'react-router-dom'

import { setActive } from 'utils/setAcitve'

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-[100px] py-[30px]  font-bold">
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
