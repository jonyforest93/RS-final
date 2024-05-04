import { Route, Routes } from 'react-router-dom'

import { LoginPage } from 'pages/Login-page/Login-page'
import { MainPage } from 'pages/Main-page/Main-page'
import { RegistrationPage } from 'pages/Registration-page/Registration-page'
import { RouterOutler } from 'router/Router-outlet'

import type { FC } from 'react'

const App: FC = () => {
  return (
    <div className="m-auto flex h-[100vh] max-w-[1440px] flex-col justify-between">
      <Routes>
        <Route path="/" element={<RouterOutler />}>
          <Route index element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
