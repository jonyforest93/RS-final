import { RadioInput } from './RadioInput'

import type { FieldValues, UseFormRegister } from 'react-hook-form'

interface IRadioInputsProps {
  register: UseFormRegister<FieldValues>
}
export const RadioInputs: React.FC<IRadioInputsProps> = ({ register }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      <RadioInput register={register} text={'Shipping adress'} value="addShippingAddressId" />
      <RadioInput register={register} text={'Default shipping adress'} value="setDefaultShippingAddress" />
      <RadioInput register={register} text={'Billing adress'} value="addBillingAddressId" />
      <RadioInput register={register} text={'Default billing adress'} value="setDefaultBillingAddress" />
    </div>
  )
}
