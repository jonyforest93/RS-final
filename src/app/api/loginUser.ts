import { passwordFlowClient } from './withPasswordFlow'

import type { UserAuthOptions } from '@commercetools/sdk-client-v2'
import type { Customer } from '@commercetools/platform-sdk'

type LoginFunction = (user: UserAuthOptions) => Promise<Customer>

export const loginUser: LoginFunction = async user => {
  const client = passwordFlowClient(user)
  try {
    const {
      body: { customer },
    } = await client
      .me()
      .login()
      .post({ body: { email: user.username, password: user.password } })
      .execute()

    return customer
  } catch {
    throw new Error('Incorrect username or password')
  }
}
