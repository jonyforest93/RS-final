import { createContext } from 'react'
interface LoggedUserState {
  isLoggedUser: boolean
  setIsLoggedUser: React.Dispatch<React.SetStateAction<boolean>>
}

interface IquantityItemsInCart {
  quantityItemsInCart: number
  setquantityItemsInCart: React.Dispatch<React.SetStateAction<number>>
}
const quantityItemsInCartState: IquantityItemsInCart = {
  quantityItemsInCart: 0,
  setquantityItemsInCart: () => {},
}

const loggedUserState: LoggedUserState = {
  isLoggedUser: false,
  setIsLoggedUser: () => {},
}

export const quantityItemsInCartContext = createContext(quantityItemsInCartState)
export const loginContext = createContext(loggedUserState)
