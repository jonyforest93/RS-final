import type { DetailedHTMLProps, Dispatch, HTMLAttributes, SetStateAction } from 'react'

interface IModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isDisplay: boolean
  bg?: string
  setDisplay?: Dispatch<SetStateAction<boolean>>
}
export const Modal: React.FC<IModalProps> = ({ children, isDisplay, setDisplay, bg }) => {
  const handleClick = (): void => {
    if (setDisplay) {
      setDisplay(false)
    }
  }
  return (
    <>
      <div
        className={`${isDisplay ? 'block' : 'hidden'} absolute left-0 top-0 z-[99] h-full w-full  bg-gray-800 bg-opacity-80  transition duration-100`}
      ></div>
      <div
        className={`${isDisplay ? 'flex' : 'hidden'} modal-position absolute z-[1000] flex min-h-[200px] flex-col items-center justify-center gap-10 bg-${bg || '[#2a8e77]'} p-10 font-osvald text-xl text-white`}
      >
        <div className="flex flex-col justify-between gap-5 text-center">{children}</div>
        {setDisplay ? (
          <button type="button" onClick={handleClick}>
            <img src="/closeIcon.png" alt="" className="absolute right-1 top-1 z-[1000] w-7" />
          </button>
        ) : null}
      </div>
    </>
  )
}
