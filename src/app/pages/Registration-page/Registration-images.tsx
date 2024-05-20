export const RegistrationImages: React.FC = () => {
  return (
    <div className=" absolute z-0 flex w-[100%]">
      <img
        src="/registrationPage/flowerLeft.png"
        alt=""
        className="absolute left-0 top-[-30px]
      z-[5]
     w-[220px] md:block md:w-[562px]"
      />
      <img
        src="/registrationPage/flowerRight.png"
        alt=""
        className="absolute right-0  top-[-50px]  z-[5] w-[500px] md:w-[903px]"
      />
      <img
        src="/registrationPage/ellipseLeftTop.png"
        alt=""
        className="md:bloc absolute left-[-150px] top-[-80px] z-0 rotate-180 md:left-[-50px] md:top-[0]"
      />
      <img src="/registrationPage/ellipseRightTop.png" alt="" className="absolute right-[-100px] z-0" />
    </div>
  )
}
