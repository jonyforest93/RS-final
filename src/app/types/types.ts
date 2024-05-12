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
}

interface IFields {
  name: string
  type: string
  isReadonly?: boolean
  validation: IFieldValidation
}

type OnDataSend = (data: string) => void

export type { IFields, OnDataSend }
