import type { FC } from 'react'

export const Footer: FC = () => {
  return (
    <footer className="relative z-50 bg-black py-[20px]">
      <div className="container mx-auto flex flex-col items-center justify-center lg:flex-row lg:justify-between">
        <ul className="flex list-none flex-col items-start justify-start gap-[20px]">
          <li className="list-title">Team RR</li>
        </ul>
        <h3 className="list-title">RS-School</h3>
        <h3 className="list-title">2024</h3>
      </div>
    </footer>
  )
}
