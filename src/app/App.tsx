import { Route, Routes } from 'react-router-dom'
import { type FC } from 'react'
import { useState } from 'react'

import { LoginPage } from 'pages/Login-page/Login-page'
import { MainPage } from 'pages/Main-page/Main-page'
import { RegistrationPage } from 'pages/Registration-page/Registration-page'
import { RouterOutler } from 'router/Router-outlet'
import { NotFoundPage } from 'pages/NotFound-page/NotFound-page'
import { Context } from 'services/Context'
import { ProductWrapper } from 'pages/ProductPage/ProductPageWrapper'
const App: FC = () => {
  const [isLoggedUser, setIsLoggedUser] = useState(Boolean(localStorage.getItem('refreshToken')))
  return (
    <Context.Provider value={{ isLoggedUser, setIsLoggedUser }}>
      <div className="font-poppins container m-auto flex min-h-[100vh] max-w-[10000px] flex-col justify-between bg-[#040a0a]">
        <Routes>
          <Route path="/" element={<RouterOutler />}>
            <Route index element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/product" element={<ProductWrapper />}></Route>
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </Context.Provider>
  )
}

export default App
