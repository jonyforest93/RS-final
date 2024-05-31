/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from 'react-hook-form'

import BaseButton from 'components/shared/BaseButton/BaseButton'

import { FormInput } from './FormInput'
import { RadioInputs } from './components/RadioInputs'

import type { AdressActionType } from 'api/addAdress'
import type { FieldValues, SubmitHandler } from 'react-hook-form'
import type { IFields } from 'types/types'

interface IAdressFormProps {
  fields: IFields[]
  onDataSend: (data: IAdressFormData) => void
}
export interface IAdressFormData {
  country: string
  city: string
  streetName: string
  postalCode: string
  radioOption: AdressActionType
}
export const AdressForm: React.FC<IAdressFormProps> = ({ fields, onDataSend }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: 'onChange' })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    Object.fromEntries(
      Object.entries(data).map(([key, value]) => (typeof value === 'string' ? [key, value.trim()] : [key, value])),
    )
    onDataSend(data as IAdressFormData)
  }

  return (
    <div className="flex flex-col items-center">
      <form className="m-auto flex flex-col items-center gap-5" onSubmit={handleSubmit(onSubmit)}>
        {fields.map(field => (
          <FormInput register={register} errors={errors} field={field} key={field.name} isEdit={true} />
        ))}
        <RadioInputs register={register} />
        <BaseButton disabled={!isValid} type="submit" variant="login">
          Submit
        </BaseButton>
      </form>
    </div>
  )
}
