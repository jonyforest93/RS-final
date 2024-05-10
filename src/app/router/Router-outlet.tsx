import { Outlet } from 'react-router-dom'

import { Header } from 'components/Header/Header'
import { Footer } from 'components/Footer'

export const RouterOutler: React.FC = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </>
  )
}
