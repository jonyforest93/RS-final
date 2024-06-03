export const setActive: ({ isActive }: { isActive: boolean }) => string | undefined = ({ isActive }) =>
  isActive ? 'link border-b 1px pointer-events-none' : 'link'
