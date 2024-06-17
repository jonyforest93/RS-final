import { NavLink } from 'react-router-dom'
import { type FC, useEffect, useState } from 'react'
import { useContext } from 'react'

import { setActive } from 'utils/setAcitve'
import { cartItemsContext, loginContext } from 'services/Context'
import { tokenData } from 'services/token-storage'
import { CART_KEY, TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { HeaderLinks } from './HeaderLinks'
import { HeaderBurger } from './HeaderBurger'

export const Header: FC = () => {
  const { isLoggedUser, setIsLoggedUser } = useContext(loginContext)
  const { cartItems, setСartItems } = useContext(cartItemsContext)
  const [scrolling, setScrolling] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const token = localStorageService.getItem(TOKEN_KEY)
    if (token) {
      setIsLoggedUser(true)
    }
    function handleScroll(): void {
      const isScrolling = window.pageYOffset > 0
      setScrolling(isScrolling)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  const handleClick: () => void = () => {
    localStorageService.removeItem(TOKEN_KEY)
    localStorageService.removeItem(CART_KEY)
    tokenData.reset()
    setIsLoggedUser(false)
    setСartItems(0)
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
          className={`absolute left-0 top-0 min-h-[100svh] w-[300px] bg-black px-4 py-8  duration-500 ${isMenuOpen ? 'left-0' : 'left-[-400px]'}`}
        >
          <div className="flex flex-col gap-10">
            <HeaderLinks setIsMenuOpen={setIsMenuOpen} />
          </div>
          <div
            className="absolute left-[305px] top-5 flex h-[50px] w-[50px] items-center justify-center bg-black"
            onClick={handleMenuClose}
          >
            <p className="text-wite cursor-pointer text-[36px]">X</p>
          </div>
        </div>
        <img src="/logo.png" alt="logo" className="hidden lg:flex" />
        <div className="title flex flex-grow  flex-col items-center text-[30px] leading-tight lg:hidden">
          <h2>Lover</h2>
          <h2>Flower</h2>
        </div>
        <div className="hidden flex-wrap gap-[75px] lg:flex">
          <HeaderLinks setIsMenuOpen={setIsMenuOpen} />
        </div>

        <div className="mr-2  flex w-[100px] items-center justify-center gap-[20px] ">
          {isLoggedUser ? (
            <div className="flex flex-col">
              <NavLink to="/profile" className={setActive}>
                Profile
              </NavLink>
              <NavLink to="/" onClick={handleClick} className="link">
                Logout
              </NavLink>
            </div>
          ) : (
            <div className="flex flex-col ">
              <NavLink className={setActive} to="/login">
                Sign In
              </NavLink>
              <NavLink className={setActive} to="/registration">
                Sign Up
              </NavLink>
            </div>
          )}
          <NavLink to="/cart" title="Cart">
            <div className="relative">
              <img src="/cart.svg" alt="cart-image" />
              {cartItems ? (
                <div className=" basic-text absolute bottom-3 left-4  h-5 w-5 rounded-full bg-[#43FFD2] text-center text-black">
                  {cartItems}
                </div>
              ) : null}
            </div>
          </NavLink>
        </div>
      </div>
    </header>
  )
}
