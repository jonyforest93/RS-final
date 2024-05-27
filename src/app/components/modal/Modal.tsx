import type { DetailedHTMLProps, HTMLAttributes } from 'react'

/* eslint-disable react/prop-types */
interface IModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isDisplay: boolean
}
export const Modal: React.FC<IModalProps> = ({ children, isDisplay }) => {
  return (
    <div
      className={`${isDisplay ? 'flex' : 'hidden'} fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-80  transition duration-100 `}
    >
      <div
        className={`flex h-[200px] flex-col items-center justify-center gap-10 bg-[#2a8e77] p-10 font-osvald text-xl text-white`}
      >
        <div className="">{children}</div>
      </div>
    </div>
  )
}
