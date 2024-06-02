import type { FieldError, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import type { IFields } from 'types/types'

interface IFormInputProps {
  field: IFields
  isEdit?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors<FieldValues>
}
export const FormInput: React.FC<IFormInputProps> = ({ field, isEdit, errors, register }) => {
  return (
    <div
      className={`flex w-[95%] max-w-[475px] flex-col ${field.name.replace(/\d+$/, '') === 'id' ? 'hidden' : 'block'}`}
    >
      <label className="basic-text mb-1 mt-3">{field.name.replace(/\d+$/, '')}</label>
      <div className="relative z-20">
        <input
          className={`h-16 w-full border border-solid pl-2 font-osvald ${
            errors[field.name] ? 'border-[#cc7a7e]' : 'border-[#555555]'
          } bg-inherit pr-12 text-[#abbad4] `}
          type={field.type}
          {...register(field.name === 'birthday' ? 'dateOfBirth' : field.name, field.validation)}
          disabled={field.name.includes('country') || !isEdit}
        />
      </div>
      {errors[field.name] ? (
        <p className="mt-1 font-normal text-[#FF3A44]">{(errors[field.name] as FieldError).message}</p>
      ) : null}
    </div>
  )
}
