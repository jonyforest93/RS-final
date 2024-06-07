export const NotFoundImages: React.FC = () => {
  return (
    <>
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
        alt="ellipse Turquoise"
        className="absolute top-[0]  rotate-[21.1deg] bg-turquoiseEllipse blur-[250px] sm:bottom-[-750px]  sm:right-[-150px] sm:top-[100%] "
      />
    </>
  )
}
