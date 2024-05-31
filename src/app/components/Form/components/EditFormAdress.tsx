import { useState } from 'react'

import { createAdressFields } from 'pages/Profile-page/Profile-components/createAdressFields'
import { generateAdressTitle } from 'utils/generateAdressTitle'
import { deleteAdress } from 'api/deleteAdress'

import { FormInput } from '../FormInput'
import { AdressCheckboxes } from '../AdressCheckboxes'

import type { Control, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import type { Address, Customer } from '@commercetools/platform-sdk'

interface IEditFormAdressProps {
  address: Address
  user: Customer
  control: Control<FieldValues>
  index: number
  isEdit: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}
export const EditFormAdress: React.FC<IEditFormAdressProps> = ({
  register,
  errors,
  user,
  address,
  control,
  isEdit,
  index,
}) => {
  const [isDeleted, setDeleteStatus] = useState<boolean>(false)
  const adressId = address.id
  const handleClick = (): void => {
    setDeleteStatus(true)
    if (adressId) {
      deleteAdress(adressId)
        .then()
        .catch(err => {
          console.error(err)
        })
    }
  }
  if (!isDeleted) {
    return (
      <div className="flex  flex-col gap-5">
        <div className="flex w-[500px] flex-col gap-3"></div>
        <div className="relative flex items-center justify-center">
          <h3 className="label text-center">{generateAdressTitle(user, address)}</h3>
          {isEdit ? (
            <button onClick={handleClick} type="button">
              <img
                src="./profilePage/deleteIcon.svg"
                alt="Delete Adress"
                className=" absolute right-0 top-3 w-6 transition-all hover:w-[28px]"
                title="Delete Adress"
              />
            </button>
          ) : null}
        </div>
        {createAdressFields(address, index).map(field => (
          <FormInput register={register} errors={errors} field={field} isEdit={isEdit} key={field.name} />
        ))}
        <AdressCheckboxes
          adress={address}
          user={user}
          control={control}
          index={index}
          isEdit={isEdit}
        ></AdressCheckboxes>
      </div>
    )
  }
  return null
}
