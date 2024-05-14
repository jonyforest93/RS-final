import type { IFields } from 'types/types'

export const registrationFields: IFields[] = [
  {
    name: 'email',
    type: 'email',
    validation: {
      required: 'fill in the field',
      pattern: { value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email address' },
    },
  },
  {
    name: 'password',
    type: 'password',
    validation: {
      required: 'fill in the field',
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/,
        message: 'Requires minimum 8 characters, 1 uppercase, 1 lowercase and 1 number',
      },
      minLength: { value: 8, message: 'Minimum 8 symbols' },
    },
  },
  {
    name: 'firstname',
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
    name: 'lastname',
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
    name: 'Date of birdth',
    type: 'date',
    validation: {
      required: 'fill in the field',
    },
  },
]

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
