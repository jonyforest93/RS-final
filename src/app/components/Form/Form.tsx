/* eslint-disable @typescript-eslint/no-misused-promises */
import { useForm } from 'react-hook-form'
import { useState } from 'react'

import BaseButton from 'components/shared/BaseButton/BaseButton'

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
    <form className=" m-auto flex max-w-lg flex-col " onSubmit={handleSubmit(onSubmit)}>
      {fields.map(field => (
        <div className=" flex  flex-col" key={field.name}>
          <label className="basic-text mb-1 mt-3">{field.name}</label>
          <div className="relative z-20">
            <input
              className={`h-16 w-full border border-solid pl-2 font-osvald ${errors[field.name] ? 'border-[#FF3A44]' : 'border-[#555555]'} bg-inherit pr-12 text-[#555555]`}
              type={field.type === 'password' && !showPassword ? 'password' : 'text'}
              {...register(field.name, field.validation)}
            ></input>
            {field.type === 'password' ? (
              <PasswordVisible isPassword={showPassword} setShowPassword={setShowPassword}></PasswordVisible>
            ) : null}
          </div>
          {errors[field.name] ? (
            <p className="mt-1 font-normal text-[#FF3A44]">{(errors[field.name] as FieldError).message}</p>
          ) : null}
        </div>
      ))}
      <BaseButton disabled={!isValid} type="submit" variant="login">
        Submit
      </BaseButton>
    </form>
  )
}

export default Form
