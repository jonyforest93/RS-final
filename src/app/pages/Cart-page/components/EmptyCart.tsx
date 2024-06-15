import { NavLink } from 'react-router-dom'

export const EmptyCart: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-10 text-center">
      <h2 className="title s text-[40px]">YOUR SHOPPING BAG IS EMPTY</h2>
      <NavLink to="/catalog">
        <p className="link ">You can go to the catalog page to add products to your cart</p>
      </NavLink>
      <img src="cartPage/signature.png" alt="signature" />
    </div>
  )
}
