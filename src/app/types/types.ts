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

export type { IFields, OnDataSend, IproductData, IproductInfo, IProduct }
