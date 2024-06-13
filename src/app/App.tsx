import { Route, Routes } from 'react-router-dom'
import { type FC, useEffect } from 'react'
import { useState } from 'react'

import { LoginPage } from 'pages/Login-page/Login-page'
import { MainPage } from 'pages/Main-page/Main-page'
import { RegistrationPage } from 'pages/Registration-page/Registration-page'
import { RouterOutler } from 'router/Router-outlet'
import { NotFoundPage } from 'pages/NotFound-page/NotFound-page'
import { loginContext, quantityItemsInCartContext } from 'services/Context'
import { ProfileWrapper } from 'pages/Profile-page/Profile-wrapper'
import { CART_KEY, TOKEN_KEY, localStorageService } from 'services/local-storage-service'
import { CatalogPage } from 'pages/Catalog-page/Catalog-page'
import { ProductWrapper } from 'pages/ProductPage/ProductPageWrapper'
import { AboutUsPage } from 'pages/AboutUsPage/AboutUsPage'
import { CartPage } from 'pages/Cart-page/CartPage'
import { getCartItems } from 'api/cart/getCartItems'

const App: FC = () => {
  const [isLoggedUser, setIsLoggedUser] = useState(Boolean(localStorageService.getItem(TOKEN_KEY)))
  const [quantityItemsInCart, setquantityItemsInCart] = useState<number>(0)
  useEffect(() => {
    const cartKey = localStorageService.getItem(CART_KEY)
    if (!cartKey) {
      return
    }
    getCartItems(cartKey)
      .then(res => {
        setquantityItemsInCart(res.lineItems.length)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
  return (
    <quantityItemsInCartContext.Provider value={{ quantityItemsInCart, setquantityItemsInCart }}>
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
              <Route path="cart" element={<CartPage />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </div>
      </loginContext.Provider>
    </quantityItemsInCartContext.Provider>
  )
}

export default App
