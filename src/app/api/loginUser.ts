import { apiRoot } from './apiRoot'

import type { Customer } from '@commercetools/platform-sdk'

interface ILoginUser {
  email: string
  password: string
}

type LoginFunction = (user: ILoginUser) => Promise<Customer>

export const loginUser: LoginFunction = async user => {
  try {
    const {
      body: { customer },
    } = await apiRoot.me().login().post({ body: user }).execute()

    return customer
  } catch {
    throw new Error('Incorrect username or password')
  }
}
