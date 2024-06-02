import React from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'

import type { IProduct } from 'api/getProducts'

export const ProductItem: React.FC<IProduct> = ({ ...props }) => {
  return (
    <div className="mb-[60px]">
      <div className="content mb-[30px] flex w-[255px] cursor-pointer flex-col items-start justify-start gap-3 overflow-hidden">
        <img src={props.image} alt={props.title} width="255px" height="335px" />
        <div>
          <h3 className="card-title truncate">{props.title}</h3>
          {props.discountPrice ? (
            <div className="flex gap-1">
              <h3 className="card-title">${props.discountPrice}</h3>
              <h3 className="text-white line-through">${props.price}</h3>
            </div>
          ) : (
            <h3 className="card-title">${props.price}</h3>
          )}
        </div>
      </div>
      <BaseButton variant="basket">Buy</BaseButton>
    </div>
  )
}
