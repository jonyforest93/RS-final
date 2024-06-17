import { Route, Routes } from 'react-router-dom'
import { type FC, useEffect } from 'react'
import { useState } from 'react'

import { LoginPage } from 'pages/Login-page/Login-page'
import { MainPage } from 'pages/Main-page/Main-page'
import { RegistrationPage } from 'pages/Registration-page/Registration-page'
import { RouterOutler } from 'router/Router-outlet'
import { NotFoundPage } from 'pages/NotFound-page/NotFound-page'
import { cartItemsContext, loginContext } from 'services/Context'
import { ProfileWrapper } from 'pages/Profile-page/Profile-wrapper'
import { CART_KEY, TOKEN_KEY, localStorageService } from 'services/local-storage-service'
import { CatalogPage } from 'pages/Catalog-page/Catalog-page'
import { ProductWrapper } from 'pages/ProductPage/ProductPageWrapper'
import { AboutUsPage } from 'pages/AboutUsPage/AboutUsPage'
import { createCart } from 'api/cart/getCartItems'
import { CartWrapper } from 'pages/Cart-page/CartWrapper'
import { getActiveCart } from 'api/cart/getActiveCart'
import { setLoggedUserCartItems } from 'utils/setLoggedUserCartItems'

const App: FC = () => {
  const [isLoggedUser, setIsLoggedUser] = useState(Boolean(localStorageService.getItem(TOKEN_KEY)))
  const [cartItems, setСartItems] = useState<number>(0)
  const [cartKeyLocalStorage, setcartKeyLocalStorage] = useState<string | null>(localStorageService.getItem(CART_KEY))

  useEffect(() => {
    const token = localStorageService.getItem(TOKEN_KEY)
    if (token) {
      getActiveCart(token)
        .then(res => {
          const cartKey = res.body?.id as string
          localStorageService.setItem(CART_KEY, cartKey)
          setcartKeyLocalStorage(cartKey)
        })
        .catch(() => {
          createCart()
            .then(res => {
              const cartKey = res.id
              localStorageService.setItem(CART_KEY, cartKey)
              setcartKeyLocalStorage(cartKey)
            })
            .catch(err => {
              console.error(err)
            })
        })
    }
  }, [isLoggedUser])

  useEffect(() => {
    const cartKey = localStorageService.getItem(CART_KEY)
    setcartKeyLocalStorage(cartKey)
  }, [isLoggedUser, cartKeyLocalStorage])

  useEffect(() => {
    if (!cartKeyLocalStorage) {
      setСartItems(0)
      return
    }
    setLoggedUserCartItems(cartKeyLocalStorage, setСartItems)
  }, [cartKeyLocalStorage])

  return (
    <cartItemsContext.Provider value={{ cartItems, setСartItems }}>
      <loginContext.Provider value={{ isLoggedUser, setIsLoggedUser }}>
        <div className="font-poppins container m-auto flex min-h-[100vh] max-w-[10000px] flex-col justify-between bg-[#040a0a]">
          <Routes>
            <Route path="/" element={<RouterOutler />}>
              <Route index element={<MainPage />} />
              <Route path="profile" element={<ProfileWrapper />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="registration" element={<RegistrationPage />} />
              <Route path="catalog/*" element={<CatalogPage />} />

              <Route path="product/:key" element={<ProductWrapper />}></Route>
              <Route path="about" element={<AboutUsPage />} />

              <Route path="product/:key" element={<ProductWrapper />} />
              <Route path="cart" element={<CartWrapper />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>
      </loginContext.Provider>
    </cartItemsContext.Provider>
  )
}

export default App
