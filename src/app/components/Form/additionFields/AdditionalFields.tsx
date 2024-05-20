/* eslint-disable react/prop-types */
import { useState } from 'react'
import {
  type Control,
  Controller,
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type UseFormRegister,
} from 'react-hook-form'

import { DefaultAdresses } from './DefaultAdress'

import type { IFields } from 'types/types'

interface IAdditionalProps {
  shippingFields?: IFields[]
  billingFields?: IFields[]
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  control: Control<FieldValues, boolean>
}

export const AdditionalFields: React.FC<IAdditionalProps> = ({
  shippingFields,
  billingFields,
  control,
  register,
  errors,
}) => {
  const [checked, setChecked] = useState<boolean>(true)
  const onChecked: () => void = () => {
    setChecked(!checked)
  }

  return (
    <div>
      <h2 className="mt-[20px] font-medium text-white">Shipping Adress</h2>
      <div className="my-6">
        {shippingFields?.map(shippingField => (
          <div className=" flex  flex-col" key={shippingField.name}>
            <label className="basic-text mb-1 mt-3">{shippingField.name}</label>
            <div className="relative z-20">
              <input
                className={`h-16 w-full border border-solid pl-2 font-osvald ${errors[shippingField.name] ? 'border-[#FF3A44]' : 'border-[#555555]'} bg-inherit pr-12 text-[#555555]`}
                type={shippingField.type}
                value={shippingField.validation.value}
                readOnly={shippingField.isReadonly}
                {...register(shippingField.name, shippingField.validation)}
              ></input>
            </div>
            {errors[shippingField.name] ? (
              <p className="mt-1 font-normal text-[#FF3A44]">{(errors[shippingField.name] as FieldError).message}</p>
            ) : null}
          </div>
        ))}
      </div>
      <div className="mt-5 flex gap-2 text-white">
        <Controller
          name="shippingMatchBilling"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <label>
              <input type="checkbox" {...field} defaultChecked onChange={onChecked} className="mr-[10px]" />
              The shipping address matches the billing address
            </label>
          )}
        />
      </div>

      {checked ? (
        ''
      ) : (
        <>
          <h2 className="mt-[20px] font-medium text-white">Billing Adress</h2>
          <div className="my-6">
            {billingFields?.map(billingField => (
              <div className=" flex  flex-col" key={billingField.name}>
                <label className="basic-text mb-1 mt-3">{billingField.name}</label>
                <div className="relative z-20">
                  <input
                    className={`h-16 w-full border border-solid pl-2 font-osvald ${errors[billingField.name] ? 'border-[#FF3A44]' : 'border-[#555555]'} bg-inherit pr-12 text-[#555555]`}
                    type={billingField.type}
                    {...register(`billing${billingField.name}`, billingField.validation)}
                  ></input>
                </div>
                {errors[billingField.name] ? (
                  <p className="mt-1 font-normal text-[#FF3A44]">{(errors[billingField.name] as FieldError).message}</p>
                ) : null}
              </div>
            ))}
          </div>
        </>
      )}
      <DefaultAdresses isShipping={!checked} control={control} />
    </div>
  )
}
