import React from 'react'

interface OrdersProps {
  title: string
  list: string[]
}

const Orders: React.FC<OrdersProps> = ({ title, list }) => {
  return (
    <div className="py order flex flex-1 basis-0 flex-col justify-start gap-[10px] px-[50px] py-[30px] align-top">
      <h3 className="list-title">{title}</h3>
      <ul className="flex list-disc flex-col items-start justify-start">
        {list.map((el, index) => (
          <li key={index} className="list-item">
            {el}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Orders
