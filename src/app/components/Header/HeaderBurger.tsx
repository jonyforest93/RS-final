export const HeaderBurger: React.FC = () => {
  return (
    <div className=" flex w-[100px] items-center justify-center lg:hidden">
      <div className="flex h-5 w-6  cursor-pointer flex-col items-center justify-between">
        <div className="h-1 w-full bg-turquoiseEllipse"></div>
        <div className="h-1 w-full bg-turquoiseEllipse"></div>
        <div className="h-1 w-full bg-turquoiseEllipse"></div>
      </div>
    </div>
  )
}
