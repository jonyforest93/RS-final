import { transormToRegisisterObject } from 'utils/transformToRegisterObject'

import { passwordFlowClient } from './withPasswordFlow'
import { anonymousClient } from './BuildClient'

import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk'

type RegistrationFunction = (user: string) => Promise<ClientResponse<CustomerSignInResult>>

export const registration: RegistrationFunction = async user => {
  const userData = transormToRegisisterObject(user)
  const client = anonymousClient()
  try {
    await client.me().signup().post({ body: userData }).execute()
    const { email, password } = userData
    const userObj = { username: email, password }

    const response = await passwordFlowClient(userObj).me().login().post({ body: { email, password } }).execute()

    return response
  } catch (err) {
    throw new Error(String(err))
  }
}
