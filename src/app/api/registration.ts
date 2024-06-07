import { transormToRegisisterObject } from 'utils/transformToRegisterObject'

import { passwordFlowClient } from './apiClients/passwordFlowClient'
import { anonymousClient } from './apiClients/anonymousClient'

import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk'

type RegistrationFunction = (user: string) => Promise<ClientResponse<CustomerSignInResult>>

export const registerUser: RegistrationFunction = async user => {
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
