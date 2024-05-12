import Form from 'components/Form/Form'

import { registrationFields } from './registration-fields'
import { billingFields, shippingFields } from './additional-fields'

import type { OnDataSend } from 'types/types'

export const RegistrationPage: React.FC = () => {
  const onDataSend: OnDataSend = data => {
    return data
  }
  return (
    <div className=" relative m-auto  flex w-[100%] flex-grow flex-col items-center justify-between overflow-x-hidden">
      <div className=" absolute z-0 flex w-[100%]">
        <img
          src="/registrationPage/flowerLeft.png"
          alt=""
          className="absolute left-0 top-[-30px]
          z-[5]
         w-[220px] md:block md:w-[562px]"
        />
        <img
          src="/registrationPage/flowerRight.png"
          alt=""
          className="absolute right-0  top-[-50px]  z-[5] w-[500px] md:w-[903px]"
        />
        <img
          src="/registrationPage/ellipseLeftTop.png"
          alt=""
          className="md:bloc absolute left-[-150px] top-[-80px] z-0 rotate-180 md:left-[-50px] md:top-[0]"
        />
        <img src="/registrationPage/ellipseRightTop.png" alt="" className="absolute right-[-100px] z-0" />
      </div>
      <div className="flex flex-col items-center justify-center gap-10">
        <h1 className=" title z-10 mt-[350px] text-6xl md:mt-[250px] md:text-8xl lg:mt-[100px]">Welcome</h1>
        <h2 className="title z-10 text-center text-5xl">Create your account</h2>
      </div>

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
