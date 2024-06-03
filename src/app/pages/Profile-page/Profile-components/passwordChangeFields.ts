import type { IFields } from 'types/types'

export const passwordChangeFields: IFields[] = [
  {
    name: 'current Password',
    type: 'password',
    validation: {
      required: 'fill in the field',
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}(?<!\s)$/,
        message:
          'Requires minimum 8 characters, 1 uppercase, 1 lowercase and 1 number and must not contain leading or trailing whitespace',
      },
      minLength: { value: 8, message: 'Minimum 8 symbols' },
    },
  },
  {
    name: 'new Password',
    type: 'password',
    validation: {
      required: 'fill in the field',
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}(?<!\s)$/,
        message:
          'Requires minimum 8 characters, 1 uppercase, 1 lowercase and 1 number and must not contain leading or trailing whitespace',
      },
      minLength: { value: 8, message: 'Minimum 8 symbols' },
    },
  },
]
