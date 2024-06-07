interface optionalProps {
  text?: string
}

export const Loading: React.FC<optionalProps> = ({ text = 'default' }) => {
  return (
    <div className="mx-auto mt-36 flex flex-col items-center justify-center">
      <img className="h-56 w-56 animate-spin object-cover max-lg:h-44 max-lg:w-44" src="/loading.png"></img>
      <h2 className="title  text-center text-white ">{text === 'default' ? 'Loading...' : 'Not product found'}</h2>
    </div>
  )
}
