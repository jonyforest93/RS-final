interface IFieldValidation {
  required: string
  minLength?: {
    value: number
    message: string
  }
  value?: string
  pattern?: {
    value: RegExp
    message: string
  }
  validate?: (value: string) => boolean | string
}

interface IFields {
  name: string
  type: string
  isReadonly?: boolean
  validation: IFieldValidation
}
interface IproductInfo {
  name: string
  description: string
  price: number
  discount: number | undefined
}

interface IproductData extends IproductInfo {
  slides: string[]
}

type OnDataSend = (data: string) => void

interface IProduct {
  keyName?: string
  title: string
  description?: string
  image?: string
  price?: number
  discountPrice?: number
}

export const enum Constants {
  MESSAGE_SHOW_TIME = 2000,
}

export interface ICollectedAddress {
  country: string | undefined
  city: string | undefined
  streetName: string | undefined
  postalCode: string | undefined
}

export interface ICollectedAddressField {
  id: string | undefined
  radioOption: string | null
  address: ICollectedAddress
}

export interface IProfileModalMessage {
  isShowMessage: boolean
  text: string
}

export interface IMainInfoObject {
  email?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
}
export type { IFields, OnDataSend, IproductData, IproductInfo, IProduct }
