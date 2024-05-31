import type { Address } from '@commercetools/platform-sdk'
import type { IFields } from 'types/types'

export const createAdressFields = (adress: Address, index: number): IFields[] => [
  {
    name: `country${String(index)}`,
    type: 'text',
    isReadonly: true,
    validation: {
      value: 'US',
      required: '',
    },
  },
  {
    name: `city${String(index)}`,
    type: 'text',
    validation: {
      value: adress.city,
      required: 'fill in the field',
      pattern: {
        value: /^[a-zA-Z]+$/,
        message: 'Requires not contain special characters or numbers',
      },

      minLength: { value: 1, message: 'Minimum 1 symbol' },
    },
  },
  {
    name: `streetName${String(index)}`,
    type: 'text',
    validation: {
      value: adress.streetName,
      required: 'fill in the field',
      minLength: { value: 1, message: 'Minimum 1 symbol' },
    },
  },
  {
    name: `postalCode${String(index)}`,
    type: 'text',
    validation: {
      value: adress.postalCode,
      required: 'fill in the field',
      pattern: {
        value: /^(\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d)$/,
        message: 'Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S)',
      },
    },
  },
]
