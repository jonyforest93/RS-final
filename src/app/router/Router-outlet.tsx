import { NavLink, Outlet } from 'react-router-dom'

// const setActive: (isActive: boolean) => void = ({ isActive }) => (isActive ? 'border-b border-black' : '')
export const RouterOutler: React.FC = () => {
  return (
    <>
      <header className="flex justify-between font-extrabold">
        <NavLink to="/">Main</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/registration">Registration</NavLink>
      </header>
      <Outlet />
    </>
  )
}
