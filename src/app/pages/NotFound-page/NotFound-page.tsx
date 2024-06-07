import { NavLink } from 'react-router-dom'

import { NotFoundImages } from './NotFoundImages'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative top-0  flex w-[100%] flex-grow flex-col  overflow-hidden bg-black">
      <div className="title z-10 ml-0 mt-[113px]  flex flex-col items-center gap-[20px] text-6xl sm:ml-[11%]  sm:block sm:text-7xl ">
        <h1>404</h1>
        <div className="ml-0 flex items-center gap-[60px] sm:ml-[6%] ">
          <img src="/notFound/Line.png" alt="" className="hidden w-[150px] sm:block" />
          <p>Not Found</p>
        </div>
      </div>
      <div className="z-10 ml-0 mt-[30px] flex flex-col items-center gap-[20px] text-white sm:ml-[17%] sm:items-start">
        <h2>404 Error</h2>
        <h2>Oops... this page doesn`t exist</h2>
        <NavLink to="/" className="link text-turquoiseEllipse">
          MAIN PAGE
        </NavLink>
      </div>
      <NotFoundImages />
    </div>
  )
}
