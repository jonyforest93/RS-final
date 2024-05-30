import type { FieldError, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import type { IFields } from 'types/types'

interface IFormInputProps {
  field: IFields
  isEdit: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}
export const FormInput: React.FC<IFormInputProps> = ({ field, isEdit, errors, register }) => {
  return (
    <div className="flex w-[95%] flex-col sm:w-[500px]" key={field.name}>
      <label className="basic-text mb-1 mt-3">{field.name}</label>
      <div className="relative z-20">
        <input
          className={`h-16 w-full border border-solid pl-2 font-osvald ${
            errors[field.name] ? 'border-[#cc7a7e]' : 'border-[#555555]'
          } bg-inherit pr-12 text-[#555555]`}
          type={field.type}
          {...register(field.name === 'birthday' ? 'dateOfBirth' : field.name, field.validation)}
          disabled={field.name === 'country' || !isEdit}
        />
      </div>
      {errors[field.name] ? (
        <p className="mt-1 font-normal text-[#FF3A44]">{(errors[field.name] as FieldError).message}</p>
      ) : null}
    </div>
  )
}
