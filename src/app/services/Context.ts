import { createContext } from 'react'
interface LoggedUserState {
  isLoggedUser: boolean
  setIsLoggedUser: React.Dispatch<React.SetStateAction<boolean>>
}
const loggedUserState: LoggedUserState = {
  isLoggedUser: false,
  setIsLoggedUser: () => {},
}
export const loginContext = createContext(loggedUserState)
