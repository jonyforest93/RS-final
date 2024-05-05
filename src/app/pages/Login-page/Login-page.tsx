import Form from 'components/Form/Form'

import type { IFields, OnDataSend } from 'types/types'

const fields: IFields[] = [
  {
    name: 'email',
    type: 'email',
    validation: {
      required: 'fill in the field',
      pattern: {
        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: 'Invalid email address',
      },
    },
  },
  {
    name: 'password',
    type: 'password',
    validation: {
      required: 'fill in the field',
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/,
        message: 'The password must contain lowercase, uppercase, and numbers',
      },
      minLength: {
        value: 8,
        message: 'Minimum 8 symbols',
      },
    },
  },
]

export const LoginPage: React.FC = () => {
  const onDataSend: OnDataSend = data => {
    return data
  }

  return (
    <>
      <h1>This is Login Page</h1>
      <Form onDataSend={onDataSend} fields={fields}></Form>
    </>
  )
}
