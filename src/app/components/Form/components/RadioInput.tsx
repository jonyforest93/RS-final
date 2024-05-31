import type { FieldValues, UseFormRegister } from 'react-hook-form'

interface IRadioInputProps {
  register: UseFormRegister<FieldValues>
  text: string
  value: string
}

export const RadioInput: React.FC<IRadioInputProps> = ({ register, text, value }) => {
  return (
    <div className="mt-5 flex gap-2 text-white">
      <label>
        <input type="radio" className="mr-[10px]" {...register('radioOption', { required: false })} value={value} />
        {text}
      </label>
    </div>
  )
}
