import { Controller } from 'react-hook-form'

import type { Control, FieldValues } from 'react-hook-form'

interface ICustomContoller {
  control: Control<FieldValues, unknown>
  name: string
  text: string
}
export const CustomController: React.FC<ICustomContoller> = ({ control, name, text }) => {
  return (
    <div className="mt-5 flex gap-2 text-white">
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <label>
            <input
              type="checkbox"
              {...field}
              defaultChecked={typeof field.value === 'boolean' ? field.value : undefined}
              className="mr-[10px]"
            />
            {text}
          </label>
        )}
      />
    </div>
  )
}
