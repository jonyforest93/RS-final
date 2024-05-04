import { Outlet } from 'react-router-dom'

import { Header } from 'components/Header'

export const RouterOutler: React.FC = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  )
}
