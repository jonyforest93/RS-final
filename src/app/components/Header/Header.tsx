import { NavLink } from 'react-router-dom'
import { type FC, useEffect, useState } from 'react'
import { useContext } from 'react'

import { setActive } from 'utils/setAcitve'
import { loginContext } from 'services/Context'
import { tokenData } from 'services/token-storage'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { HeaderLinks } from './HeaderLinks'
import { HeaderBurger } from './HeaderBurger'

export const Header: FC = () => {
  const { isLoggedUser, setIsLoggedUser } = useContext(loginContext)
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
    tokenData.reset()
    setIsLoggedUser(false)
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
            <NavLink to="/catalog" className="link">
              Catalog
            </NavLink>
            <NavLink to="/about" className="link">
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
        <div className="title flex flex-grow  flex-col items-center text-[30px] leading-tight lg:hidden">
          <h2>Lover</h2>
          <h2>Flower</h2>
        </div>
        <HeaderLinks />
        <div className="flex  w-[100px] items-center justify-center gap-[20px] ">
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
              <NavLink className="link" to="/login">
                Sign In
              </NavLink>
              <NavLink className="link" to="/registration">
                Sign Up
              </NavLink>
            </div>
          )}
          <NavLink to="/cart" title="Cart">
            <img src="/cart.svg" alt="cart-image" />
          </NavLink>
        </div>
      </div>
    </header>
  )
}
