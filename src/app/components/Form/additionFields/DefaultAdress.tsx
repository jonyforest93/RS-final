import { Controller } from 'react-hook-form'

import type { Control, FieldValues } from 'react-hook-form'
interface IDefaultProps {
  isShipping: boolean
  control: Control<FieldValues, boolean>
}

export const DefaultAdresses: React.FC<IDefaultProps> = ({ isShipping, control }) => {
  return (
    <div>
      <div className="mt-5 flex gap-2 text-white">
        <Controller
          name="shippingDefault"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <label>
              <input
                type="checkbox"
                {...field}
                defaultChecked={typeof field.value === 'boolean' ? field.value : undefined}
                className="mr-[10px]"
              />
              Use shipping address as default
            </label>
          )}
        />
      </div>
      {isShipping ? (
        <div className="mt-5 flex gap-2 text-white">
          <Controller
            name="billingDefault"
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
                Use billing address as default
              </label>
            )}
          />
        </div>
      ) : null}
    </div>
  )
}
