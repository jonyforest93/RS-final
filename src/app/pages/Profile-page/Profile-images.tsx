export const ProfileImages: React.FC = () => {
  return (
    <div className="absolute top-0 z-0 h-[100%] w-[100%]">
      <img src="/profilePage/ellipseLeftTop.png" alt="ellipseLeftTop" className="absolute left-0 z-0" />
      <img src="/profilePage/flowerLeft.png" alt="flowerLeft" className="absolute left-0 z-10" />
      <img src="/profilePage/flowerRight.png" alt="flowerRight" className="absolute right-0 top-0 z-10 " />
      <img src="/profilePage/ellipseRightTop.png" alt="ellipseRightTop" className="absolute right-0 top-0 z-0" />
      <img
        src="/profilePage/ellipseLeftBottom.png"
        alt="ellipseLeftBottom"
        className="absolute bottom-[-200px] left-0 z-0"
      />
      <img
        src="/profilePage/ellipseRightBottom.png"
        alt="ellipseRightBottom"
        className="absolute bottom-[-200px] right-0 z-0"
      />
    </div>
  )
}
