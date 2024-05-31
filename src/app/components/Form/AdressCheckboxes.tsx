import { Controller } from 'react-hook-form'

import type { Control, FieldValues } from 'react-hook-form'
import type { Address, Customer } from '@commercetools/platform-sdk'

interface IAdressInputsProps {
  adress: Address
  user: Customer
  control: Control<FieldValues>
  index: number
  isEdit: boolean
}

export const AdressCheckboxes: React.FC<IAdressInputsProps> = ({ adress, user, control, index, isEdit }) => {
  if (isEdit) {
    return (
      <div className="flex flex-col gap-5">
        <div className="mt-5 flex gap-2 text-white">
          <Controller
            name={`${index}defaultShippingAdress`}
            control={control}
            defaultValue={user.defaultShippingAddressId?.includes(adress.id as string)}
            render={({ field }) => (
              <label>
                <input
                  type="checkbox"
                  {...field}
                  defaultChecked={typeof field.value === 'boolean' ? field.value : undefined}
                  className="mr-[10px]"
                />
                Default Shipping Adress
              </label>
            )}
          />
        </div>
        <div className="mt-5 flex gap-2 text-white">
          <Controller
            name={`${index}defaultBillingAdress`}
            control={control}
            defaultValue={user.defaultBillingAddressId?.includes(adress.id as string)}
            render={({ field }) => (
              <label>
                <input
                  type="checkbox"
                  {...field}
                  defaultChecked={typeof field.value === 'boolean' ? field.value : undefined}
                  className="mr-[10px]"
                />
                Default Billing Adress
              </label>
            )}
          />
        </div>
        <div className="mt-5 flex gap-2 text-white">
          <Controller
            name={`${index}billingAdress`}
            control={control}
            defaultValue={user.billingAddressIds?.includes(adress.id as string)}
            render={({ field }) => (
              <label>
                <input
                  type="checkbox"
                  {...field}
                  defaultChecked={typeof field.value === 'boolean' ? field.value : undefined}
                  className="mr-[10px]"
                />
                Billing Adress
              </label>
            )}
          />
        </div>
        <div className="mt-5 flex gap-2 text-white">
          <Controller
            name={`${index}shippingAdress`}
            control={control}
            defaultValue={user.shippingAddressIds?.includes(adress.id as string)}
            render={({ field }) => (
              <label>
                <input
                  type="checkbox"
                  {...field}
                  defaultChecked={typeof field.value === 'boolean' ? field.value : undefined}
                  className="mr-[10px]"
                />
                Shipping Adress
              </label>
            )}
          />
        </div>
      </div>
    )
  }
  return null
}
