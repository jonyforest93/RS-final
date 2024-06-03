export const Loading: React.FC = () => {
  return (
    <div className="mx-auto mt-36 flex flex-col items-center justify-center">
      <img className="h-56 w-56 animate-spin object-cover max-lg:h-44 max-lg:w-44" src="/loading.png"></img>
      <h2 className="title  text-center text-white ">Loading...</h2>
    </div>
  )
}
