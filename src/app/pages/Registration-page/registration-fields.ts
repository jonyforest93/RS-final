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
    name: 'firstName',
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
    name: 'lastName',
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
    name: 'Birthday',
    type: 'date',
    validation: {
      required: 'fill in the field',
      pattern: {
        value: /\d{4}-\d{2}-\d{2}/,
        message: 'Enter correct data',
      },
      validate: (value: string): string | boolean => {
        const inputDate = new Date(value)
        const maxDate = new Date('2011-12-31')
        const minDate = new Date('1910-12-31')

        return (inputDate <= maxDate && inputDate > minDate) || 'Date must be after 31.12.1910 and before 31.12.2011'
      },
    },
  },
]

export const shippingFields: IFields[] = [
  {
    name: 'country',
    type: 'text',
    isReadonly: true,
    validation: {
      value: 'US',
      required: '',
    },
  },
  {
    name: 'city',
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
    name: 'streetName',
    type: 'text',
    validation: {
      required: 'fill in the field',
      minLength: { value: 1, message: 'Minimum 1 symbol' },
    },
  },
  {
    name: 'postalCode',
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
    name: 'country',
    type: 'text',
    isReadonly: true,
    validation: {
      value: 'US',
      required: '',
    },
  },
  {
    name: 'city',
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
    name: 'streetName',
    type: 'text',
    validation: {
      required: 'fill in the field',
      minLength: { value: 1, message: 'Minimum 1 symbol' },
    },
  },
  {
    name: 'postalCode',
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
