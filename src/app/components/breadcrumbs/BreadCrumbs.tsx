import { Link, useLocation } from 'react-router-dom'

export const Breadcrumbs: React.FC = () => {
  const location = useLocation()
  const pathnames = location.pathname.split('/').filter(x => x)

  return (
    <nav className="z-50  text-white ">
      <ul className="flex">
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`
          return (
            <div key={to} className="flex items-center">
              <li className="link p-2">
                <Link to={to}>
                  {value.split('%20').map(element => {
                    return element.slice(0, 1).toLocaleUpperCase() + element.slice(1)
                  })}
                </Link>
              </li>
              {index < pathnames.length - 1 ? <span>/</span> : null}
            </div>
          )
        })}
      </ul>
    </nav>
  )
}
