import { RadioInput } from './components/RadioInput'

import type { FieldValues, UseFormRegister } from 'react-hook-form'

interface IAdressInputsProps {
  index: number
  isEdit: boolean
  register: UseFormRegister<FieldValues>
}

export const AdressCheckboxes: React.FC<IAdressInputsProps> = ({ index, isEdit, register }) => {
  if (isEdit) {
    return (
      <div className="flex w-[500px]  ">
        <div className="mt-5 flex flex-wrap justify-center gap-10 text-white">
          <RadioInput
            register={register}
            text={'Set as shipping address'}
            value="addShippingAddressId"
            index={index}
          ></RadioInput>
          <RadioInput
            register={register}
            text={'Set as default shipping address'}
            value="setDefaultShippingAddress"
            index={index}
          ></RadioInput>
          <RadioInput
            register={register}
            text={'Set as default billing address'}
            value="setDefaultBillingAddress"
            index={index}
          ></RadioInput>
          <RadioInput
            register={register}
            text={'Set as billing address'}
            value="addBillingAddressId"
            index={index}
          ></RadioInput>
        </div>
      </div>
    )
  }
  return null
}
