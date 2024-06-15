import { NavLink } from 'react-router-dom'

import { setActive } from 'utils/setAcitve'

export const HeaderLinks: React.FC = () => {
  return (
    <>
      <NavLink to="/" className={setActive}>
        Home
      </NavLink>
      <NavLink to="/catalog" className={setActive}>
        Catalog
      </NavLink>
      <NavLink to="/about" className={setActive}>
        About Us
      </NavLink>
    </>
  )
}
