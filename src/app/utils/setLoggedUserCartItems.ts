import { getCartItems } from 'api/cart/getCartItems'

export function setLoggedUserCartItems(
  cartKey: string,
  setCartItems: React.Dispatch<React.SetStateAction<number>>,
): void {
  getCartItems(cartKey)
    .then(response => {
      setCartItems(response.lineItems.length)
    })
    .catch(err => {
      console.error(err)
    })
}
