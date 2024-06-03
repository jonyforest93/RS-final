interface ArrowIconProps {
  rotate: number
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ rotate }: ArrowIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#43FFD2"
      className={'size-6'}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
    </svg>
  )
}

export default ArrowIcon
