import React from 'react'

interface OrdersProps {
  title: string
  description: string
}

const Orders = ({ title, description }: OrdersProps): JSX.Element => {
  return (
    <div className=" flex w-full max-w-[250px] flex-col justify-start gap-[10px] rounded-2xl bg-black bg-opacity-95 px-[10px] py-[30px] align-top backdrop-blur-sm backdrop-filter">
      <h3 className="list-title text-center text-base">{title}</h3>
      <p className="basic-text text-center">{description}</p>
    </div>
  )
}

export default Orders
