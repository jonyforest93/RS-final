import { NavLink } from 'react-router-dom'

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative  flex h-[100%]  w-[100%] flex-col  overflow-hidden bg-black ">
      <div className="title z-10 ml-0 mt-[113px]  flex flex-col items-center gap-[20px] text-5xl sm:ml-[11%]  sm:block sm:text-7xl ">
        <h1>404</h1>
        <div className="ml-0 flex items-center gap-[60px] sm:ml-[6%] ">
          <img src="/notFound/Line.png" alt="" className="hidden w-[150px] sm:block" />
          <p className=" ">Not Found</p>
        </div>
      </div>
      <div className="z-10 ml-0 mt-[30px] flex flex-col items-center gap-[20px] text-white sm:ml-[17%] sm:items-start">
        <h2>404 Not Found</h2>
        <h2>Oops... this page doesn`t exist</h2>
        <NavLink
          to="/"
          className={
            'font-oswald relative z-[10] text-left text-xs font-extrabold uppercase leading-[21px] tracking-wider text-[rgb(67,255,210)] hover:underline'
          }
        >
          Main Page
        </NavLink>
      </div>
      <img src="/notFound/signaturePink.png" alt="" className="z-10 ml-[38%] mt-[30px] h-[140px] w-[200px]" />
      <img src="/notFound/pinkImg.png" alt="" className="absolute bottom-[-100px] right-0 z-[5]" />
      <img src="/notFound/eclipsePink.png" alt="" className="absolute  top-[350px]" />
      <img src="/notFound/bigEllipsePink.png" alt="" className="absolute  right-0  blur-[200px]" />
      <img
        src="/notFound/ellipseTurquoise.png"
        alt=""
        className="absolute bottom-[-750px] right-[-150px] rotate-[21.1deg] bg-turquoiseEllipse blur-[250px]"
      />
    </div>
  )
}
