import { NavLink } from 'react-router-dom'

import { setActive } from 'utils/setAcitve'

interface Props {
  setIsMenuOpen: (value: boolean) => void
}

export const HeaderLinks: React.FC<Props> = ({ setIsMenuOpen }) => {
  const handleMenuClose: () => void = () => {
    setIsMenuOpen(false)
  }

  return (
    <>
      <NavLink onClick={handleMenuClose} to="/" className={setActive}>
        Home
      </NavLink>
      <NavLink onClick={handleMenuClose} to="/catalog" className={setActive}>
        Catalog
      </NavLink>
      <NavLink onClick={handleMenuClose} to="/about" className={setActive}>
        About Us
      </NavLink>
    </>
  )
}
