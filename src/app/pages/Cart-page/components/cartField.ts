import type { IFields } from 'types/types'

export const cartFields: IFields[] = [
  {
    name: 'promocode',
    type: 'text',
    isReadonly: true,
    validation: {
      required: '',
    },
  },
]
