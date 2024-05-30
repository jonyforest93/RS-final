/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from 'react-hook-form'

import BaseButton from 'components/shared/BaseButton/BaseButton'
import { generateAdressTitle } from 'utils/generateAdressTitle'
import { createAdressFields } from 'pages/Profile-page/Profile-components/createAdressFields'

import { FormInput } from './formInput'

import type { FieldValues, SubmitHandler } from 'react-hook-form'
import type { Customer } from '@commercetools/platform-sdk'
import type { IFields } from 'types/types'
import type { FC } from 'react'

interface IEditFormProps {
  onDataSend: (data: IFormData) => void
  fields: IFields[]
  isEdit: boolean
  user: Customer
  onEdit: () => void
}
export interface IFormData {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  city: string
  streetName: string
  postalCode: string
}
export const EditForm: FC<IEditFormProps> = ({ fields, onDataSend, isEdit, user, onEdit }: IEditFormProps) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' })

  const handleEdit = (): void => {
    onEdit()
  }
  const onSubmit: SubmitHandler<FieldValues> = data => {
    Object.fromEntries(
      Object.entries(data).map(([key, value]) => (typeof value === 'string' ? [key, value.trim()] : [key, value])),
    )
    onDataSend(data as IFormData)
    onEdit()
  }

  return (
    <div className="flex flex-col items-center">
      <form className="m-auto flex flex-col items-center gap-5" onSubmit={handleSubmit(onSubmit)}>
        {fields.map(field => (
          <FormInput register={register} errors={errors} field={field} isEdit={isEdit} key={field.name} />
        ))}
        <h2 className="title mt-4 text-center text-2xl">Adresses</h2>
        <div className="z-20 flex flex-wrap justify-center gap-5">
          {user.addresses.length
            ? user.addresses.map((adress, index) => {
                return (
                  <div className="flex  flex-col" key={index}>
                    <div className="flex w-[500px] flex-col gap-3"></div>
                    <h3 className="label text-center">{generateAdressTitle(user, adress)}</h3>
                    {createAdressFields(adress).map(field => (
                      <FormInput register={register} errors={errors} field={field} isEdit={isEdit} key={field.name} />
                    ))}
                  </div>
                )
              })
            : null}
        </div>
        {isEdit ? (
          <BaseButton disabled={!isValid} type="submit" variant="primary">
            Save Changes
          </BaseButton>
        ) : null}
      </form>
      {isEdit ? null : (
        <div className="mt-5">
          <BaseButton type="button" variant="primary" onClick={handleEdit}>
            Edit
          </BaseButton>
        </div>
      )}
    </div>
  )
}
