interface IFieldValidation {
  required: string
  minLength?: {
    value: number
    message: string
  }
  pattern: {
    value: RegExp
    message: string
  }
}

interface IFields {
  name: string
  type: string
  validation: IFieldValidation
}

type OnDataSend = (data: string) => void

export type { IFields, OnDataSend }
