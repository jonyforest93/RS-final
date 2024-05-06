/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import PasswordVisible from './PasswordVisible'

import type { IFields, OnDataSend } from 'types/types'
import type { FieldError } from 'react-hook-form'
import type { FC } from 'react'

interface IProps {
  onDataSend: OnDataSend
  fields: IFields[]
}

const Form: FC<IProps> = ({ fields, onDataSend }: IProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({ mode: 'onChange' })
  const onSubmit = (data: Record<string, string>): void => {
    const trimData = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value.trim()]))
    onDataSend(JSON.stringify(trimData))
    reset()
  }

  return (
    <form className=" flex max-w-lg flex-col" onSubmit={handleSubmit(onSubmit)}>
      {fields.map(field => (
        <div className=" flex  flex-col" key={field.name}>
          <label className="mb-6 mt-3 font-medium">{field.name}</label>
          <div className="relative">
            <input
              className="h-16 w-full rounded-xl border border-solid border-gray-600 pr-12 font-normal text-gray-600"
              type={field.type === 'password' && !showPassword ? 'password' : 'text'}
              {...register(field.name, field.validation)}
            ></input>
            {field.type === 'password' ? (
              <PasswordVisible isPassword={showPassword} setShowPassword={setShowPassword}></PasswordVisible>
            ) : null}
          </div>
          {errors[field.name] ? (
            <p className="mt-1 font-normal text-red-300">{(errors[field.name] as FieldError).message}</p>
          ) : null}
        </div>
      ))}
      <button disabled={!isValid} className="mt-12 rounded " type="submit">
        Submit
      </button>
    </form>
  )
}

export default Form
