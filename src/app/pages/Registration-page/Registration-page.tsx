import Form from 'components/Form/Form'

import { billingFields, registrationFields, shippingFields } from './Registration-fields'
import { RegistrationImages } from './Registration-images'
import { RegistrationTitle } from './Registration-title'

import type { OnDataSend } from 'types/types'

export const RegistrationPage: React.FC = () => {
  const onDataSend: OnDataSend = data => {
    return data
  }
  return (
    <div className=" relative m-auto  flex w-[100%] flex-grow flex-col items-center justify-between overflow-x-hidden">
      <RegistrationImages />
      <RegistrationTitle />
      <div className="z-10 m-auto w-[100%] px-[10px]">
        <Form
          fields={registrationFields}
          onDataSend={onDataSend}
          isRegister={true}
          shippingFields={shippingFields}
          billingFields={billingFields}
        ></Form>
      </div>
    </div>
  )
}
