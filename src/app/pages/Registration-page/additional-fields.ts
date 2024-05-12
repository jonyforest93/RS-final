import type { IFields } from 'types/types'

export const shippingFields: IFields[] = [
  {
    name: 'Shipping adress (country)',
    type: 'text',
    isReadonly: true,
    validation: {
      value: 'USA',
      required: '',
    },
  },
  {
    name: 'Shipping adress (city)',
    type: 'text',
    validation: {
      required: 'fill in the field',
      pattern: {
        value: /^[a-zA-Z]+$/,
        message: 'Requires not contain special characters or numbers',
      },

      minLength: { value: 1, message: 'Minimum 1 symbol' },
    },
  },
  {
    name: 'Shipping adress (street)',
    type: 'text',
    validation: {
      required: 'fill in the field',
      minLength: { value: 1, message: 'Minimum 1 symbol' },
    },
  },
  {
    name: 'Shipping adress (postalcode)',
    type: 'text',
    validation: {
      required: 'fill in the field',
      pattern: {
        value: /^(\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d)$/,
        message: 'Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S)',
      },
    },
  },
]
export const billingFields: IFields[] = [
  {
    name: 'Billing adress (country)',
    type: 'text',
    isReadonly: true,
    validation: {
      value: 'USA',
      required: '',
    },
  },
  {
    name: 'Billing adress (city)',
    type: 'text',
    validation: {
      required: 'fill in the field',
      pattern: {
        value: /^[a-zA-Z]+$/,
        message: 'Requires not contain special characters or numbers',
      },

      minLength: { value: 1, message: 'Minimum 1 symbol' },
    },
  },
  {
    name: 'Billing adress (street)',
    type: 'text',
    validation: {
      required: 'fill in the field',
      minLength: { value: 1, message: 'Minimum 1 symbol' },
    },
  },
  {
    name: 'Billing adress (postalcode)',
    type: 'text',
    validation: {
      required: 'fill in the field',
      pattern: {
        value: /^(\d{5}|[A-Z]\d[A-Z] \d[A-Z]\d)$/,
        message: 'Must follow the format for the country (e.g., 12345 or A1B 2C3 for the U.S)',
      },
    },
  },
]
