export const setActive: ({ isActive }: { isActive: boolean }) => string | undefined = ({ isActive }) =>
  isActive ? 'border-b border-black' : ''
