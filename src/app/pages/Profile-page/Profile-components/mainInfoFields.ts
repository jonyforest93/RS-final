import type { IFields } from 'types/types'

export interface IMainInfoObject {
  email?: string
  firstName?: string
  lastName?: string
  dateOfBirth?: string
}
export const createMainFields = ({ email, firstName, lastName, dateOfBirth }: IMainInfoObject): IFields[] => [
  {
    name: 'email',
    type: 'email',
    validation: {
      value: email,
      required: 'fill in the field',
      pattern: { value: /^^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: 'Invalid email address' },
    },
  },
  {
    name: 'firstName',
    type: 'text',
    validation: {
      value: firstName,
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
      value: lastName,
      required: 'fill in the field',
      pattern: {
        value: /^[a-zA-Z]+$/,
        message: 'Requires not contain special characters or numbers',
      },
      minLength: { value: 1, message: 'Minimum 1 symbol' },
    },
  },
  {
    name: 'birthday',
    type: 'date',
    validation: {
      value: dateOfBirth,
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
