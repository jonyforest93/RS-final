import { NavLink } from 'react-router-dom'

import { setActive } from 'utils/setAcitve'

export const HeaderLinks: React.FC = () => {
  return (
    <div className="hidden flex-wrap gap-[75px] lg:flex">
      <NavLink to="/" className={setActive}>
        Home
      </NavLink>
      <NavLink to="/" className="link">
        Catalog
      </NavLink>
      <NavLink to="/" className="link">
        About Us
      </NavLink>
      <NavLink to="/" className="link">
        Contacts
      </NavLink>
    </div>
  )
}
