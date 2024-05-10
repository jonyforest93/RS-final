import type { IFields } from 'types/types'

export const fields: IFields[] = [
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
]
