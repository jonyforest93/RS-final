import { useState } from 'react'

import { createAdressFields } from 'pages/Profile-page/Profile-components/createAdressFields'
import { generateAdressTitle } from 'utils/generateAdressTitle'

import { AdressCheckboxes } from '../AdressCheckboxes'
import { FormInput } from '../FormInput'

import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import type { Address, Customer } from '@commercetools/platform-sdk'

interface IEditFormAdressProps {
  address: Address
  user: Customer
  index: number
  isEdit: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
  addressesToDelete: string[]
}
export const EditFormAdress: React.FC<IEditFormAdressProps> = ({
  register,
  errors,
  user,
  address,
  isEdit,
  index,
  addressesToDelete,
}) => {
  const [isDeleted, setDeleteStatus] = useState<boolean>(false)
  const adressId = address.id
  const handleClick = (): void => {
    setDeleteStatus(true)
    if (adressId) {
      addressesToDelete.push(address.id)
    }
  }
  if (!isDeleted) {
    return (
      <div className=" flex w-[95%] max-w-[500px] flex-col items-center gap-5">
        <div className="flex flex-col gap-3"></div>
        <div className="relative flex w-[100%] max-w-[500px] flex-col">
          <h3 className="label text-center">{generateAdressTitle(user, address)}</h3>
          {isEdit ? (
            <button onClick={handleClick} type="button">
              <img
                src="./profilePage/deleteIcon.svg"
                alt="Delete Adress"
                className="absolute right-0 top-[9px] w-6 transition-all"
                title="Delete Adress"
              />
            </button>
          ) : null}
        </div>
        {createAdressFields(address, index).map(field => (
          <FormInput register={register} errors={errors} field={field} isEdit={isEdit} key={field.name} />
        ))}
        <AdressCheckboxes index={index} isEdit={isEdit} register={register}></AdressCheckboxes>
      </div>
    )
  }
  return null
}
