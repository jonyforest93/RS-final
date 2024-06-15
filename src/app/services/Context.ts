import { createContext } from 'react'
interface LoggedUserState {
  isLoggedUser: boolean
  setIsLoggedUser: React.Dispatch<React.SetStateAction<boolean>>
}

interface IcartItems {
  cartItems: number
  setСartItems: React.Dispatch<React.SetStateAction<number>>
}
const cartItemsState: IcartItems = {
  cartItems: 0,
  setСartItems: () => {},
}

const loggedUserState: LoggedUserState = {
  isLoggedUser: false,
  setIsLoggedUser: () => {},
}

export const cartItemsContext = createContext(cartItemsState)
export const loginContext = createContext(loggedUserState)
