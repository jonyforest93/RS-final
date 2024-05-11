import { Route, Routes } from 'react-router-dom'
import { type FC } from 'react'

import { LoginPage } from 'pages/Login-page/Login-page'
import { MainPage } from 'pages/Main-page/Main-page'
import { RegistrationPage } from 'pages/Registration-page/Registration-page'
import { RouterOutler } from 'router/Router-outlet'
import { NotFoundPage } from 'pages/NotFound-page/NotFound-page'

const App: FC = () => {
  return (
    <div className="font-poppins container m-auto flex min-h-[100vh] max-w-[10000px] flex-col justify-between bg-black">
      <Routes>
        <Route path="/" element={<RouterOutler />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
