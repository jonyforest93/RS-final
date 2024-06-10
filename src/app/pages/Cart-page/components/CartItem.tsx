import type { LineItem } from '@commercetools/platform-sdk'

export const CartItem: React.FC<LineItem> = ({ ...props }) => {
  const imageUrl = props.variant.images
  return (
    <div className="flex w-[350px] gap-5">
      <img src={imageUrl ? imageUrl[0].url : ''} alt="productImage" className="w-[120px]" />
      <div className="flex flex-col justify-between">
        <div className="flex justify-between">
          <h2 className="w-[100px]">{props.name['en-US']}</h2>
          <p className="font-extrabold text-turquoiseEllipse">{`${(props.price.value.centAmount / 100) * props.quantity} USD`}</p>
        </div>
        <div className="flex  items-center gap-5">
          <div className="flex h-[30px] w-[100px] items-center justify-center gap-[22px] border border-gray-600">
            <button type="button">-</button>
            <p>{props.quantity}</p>
            <button type="button">+</button>
          </div>
          <button type="button">Delete</button>
        </div>
      </div>
    </div>
  )
}
