import { NavLink } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative top-[-80px]  flex w-[100%] flex-grow flex-col  overflow-hidden bg-black">
      <div className="title z-10 ml-0 mt-[113px]  flex flex-col items-center gap-[20px] text-6xl sm:ml-[11%]  sm:block sm:text-7xl ">
        <h1>404</h1>
        <div className="ml-0 flex items-center gap-[60px] sm:ml-[6%] ">
          <img src="/notFound/Line.png" alt="" className="hidden w-[150px] sm:block" />
          <p className=" ">Not Found</p>
        </div>
      </div>
      <div className="z-10 ml-0 mt-[30px] flex flex-col items-center gap-[20px] text-white sm:ml-[17%] sm:items-start">
        <h2>404 Error</h2>
        <h2>Oops... this page doesn`t exist</h2>
        <NavLink to="/" className="link text-turquoiseEllipse">
          MAIN PAGE
        </NavLink>
      </div>
      <img
        src="/notFound/signaturePink.png"
        alt="signaturePink"
        className="z-10 mt-[30px] hidden h-[140px] w-[200px] sm:ml-[25%] lg:block"
      />
      <img src="/notFound/pinkImg.png" alt="mainImg" className="absolute bottom-0 right-0 z-[5] sm:bottom-[-100px]" />
      <img src="/notFound/eclipsePink.png" alt="ellipsePink" className="absolute  top-[350px]" />
      <img src="/notFound/bigEllipsePink.png" alt="biEllipsePink" className="absolute  right-0  blur-[200px]" />
      <img
        src="/notFound/ellipseTurquoise.png"
        alt=""
        className="absolute top-[0]  rotate-[21.1deg] bg-turquoiseEllipse blur-[250px] sm:bottom-[-750px]  sm:right-[-150px] sm:top-[100%] "
      />
    </div>
  )
}
