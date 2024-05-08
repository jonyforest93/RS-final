/* eslint-disable prettier/prettier */
import { apiRoot } from './apiRoot'

import type { LoginFunction } from 'types/login-types'

export const loginUser: LoginFunction = async user => {
  try {
    const {
      body: { customer },
    } = await apiRoot.me().login()
.post({ body: user })
.execute()

    return customer
  } catch {
    throw new Error('Incorrect username or password')
  }
}
