import { NavLink } from 'react-router-dom'
import { type FC, useEffect, useState } from 'react'

import { setActive } from 'utils/setAcitve'

import { HeaderLinks } from './HeaderLinks'
import { HeaderBurger } from './HeaderBurger'

export const Header: FC = () => {
  const [logStatus, setLogStatus] = useState<boolean>(false)
  const [scrolling, setScrolling] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    function handleScroll(): void {
      const isScrolling = window.pageYOffset > 0
      setScrolling(isScrolling)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('reactReaction')) {
      setLogStatus(true)
    }
  }, [])

  const handleClick: () => void = () => {
    setLogStatus(false)
  }

  const handleMenuToggle: () => void = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMenuClose: () => void = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 h-[80px] w-full ${scrolling ? 'bg-black' : 'bg-transparent'} z-50 text-white transition duration-500`}
    >
      <div className="container mx-auto flex items-center justify-center lg:justify-between ">
        <HeaderBurger onClick={handleMenuToggle} />
        <div
          className={`absolute left-0 top-0 min-h-[100svh] w-[300px] bg-black px-4 py-8 ${isMenuOpen ? 'block' : 'hidden'}`}
        >
          <div className="flex flex-col gap-10">
            <NavLink to="/" className={setActive}>
              Home
            </NavLink>
            <NavLink to="/" className="link">
              Catalog
            </NavLink>
            <NavLink to="/" className="link">
              About Us
            </NavLink>
            <NavLink to="/" className="link">
              Contacts
            </NavLink>
          </div>
          <div
            className="absolute left-[305px] top-5 flex h-[50px] w-[50px] items-center justify-center bg-black"
            onClick={handleMenuClose}
          >
            <p className="text-wite cursor-pointer text-[36px]">X</p>
          </div>
        </div>
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
