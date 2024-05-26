interface SliderProps {
  slides: string[]
  currentImg: number
  setCurrentImg: React.Dispatch<React.SetStateAction<number>>
}

const Slider: React.FC<SliderProps> = ({ slides, currentImg, setCurrentImg }: SliderProps) => {
  const previousSlide = (): void => {
    if (currentImg === slides.length - 1) {
      setCurrentImg(currentImg - 1)
    }
  }
  const nextSlide = (): void => {
    if (currentImg === 0) {
      setCurrentImg(currentImg + 1)
    }
  }
  return (
    <div className="relative overflow-hidden ">
      <div
        className={` duration-40 flex h-[450px] transition ease-out `}
        style={{ transform: `translate(-${currentImg * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <img className="object-cover" src={slide} key={i} />
        ))}
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full items-center justify-between">
        <button onClick={previousSlide} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#43FFD2"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button onClick={nextSlide} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#43FFD2"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
      <div className="absolute bottom-0 flex w-full justify-center gap-2 py-4">
        {slides.map((_, i) => (
          <div
            key={`circle${i}`}
            className={`h-3 w-3 rounded-full  ${i === currentImg ? 'bg-white' : 'bg-gray-500'}`}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default Slider
