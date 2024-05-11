import { NavLink } from 'react-router-dom'
import { type FC, useEffect, useState } from 'react'

import { setActive } from 'utils/setAcitve'

import { HeaderLinks } from './HeaderLinks'
import { HeaderBurger } from './HeaderBurger'

export const Header: FC = () => {
  const [logStatus, setLogStatus] = useState<boolean>(false)
  useEffect(() => {
    if (localStorage.getItem('reactReaction')) {
      setLogStatus(true)
    }
  }, [])
  const handleClick: () => void = () => {
    setLogStatus(false)
  }
  return (
    <header className="h-[80px] text-white">
      <div className="container m-auto flex items-center justify-center lg:justify-between ">
        <HeaderBurger />
        <div className="flex lg:hidden"></div>
        <img src="/logo.png" alt="logo" className="hidden lg:flex" />
        <div className="title flex flex-grow  flex-col items-center text-[30px] lg:hidden">
          <h2>Lower</h2>
          <h2>Flower</h2>
        </div>
        <HeaderLinks />
        <div className="flex  w-[100px] items-center gap-[20px] ">
          {logStatus ? (
            <NavLink to="/" onClick={handleClick} className={setActive}>
              Logout
            </NavLink>
          ) : (
            <div className="flex flex-col ">
              <NavLink className={setActive} to="/login">
                Sign Up
              </NavLink>
              <NavLink className={setActive} to="/registration">
                Sign In
              </NavLink>
            </div>
          )}
          <NavLink to="/">
            <img src="/cart.svg" alt="" />
          </NavLink>
        </div>
      </div>
    </header>
  )
}
