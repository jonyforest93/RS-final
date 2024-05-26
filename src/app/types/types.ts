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
interface IproductData {
  slides: string[]
  name: string
  description: string
  price: number
  discount: number | undefined
}
type OnDataSend = (data: string) => void

export type { IFields, OnDataSend, IproductData }
