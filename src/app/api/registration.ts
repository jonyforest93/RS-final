import { transormToRegisisterObject } from 'utils/transformToRegisterObject'

import { apiRoot } from './apiRoot'
import { passwordFlowClient } from './withPasswordFlow'

import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk'

type RegistrationFunction = (user: string) => Promise<ClientResponse<CustomerSignInResult>>

export const registration: RegistrationFunction = async user => {
  const userData = transormToRegisisterObject(user)
  try {
    await apiRoot.me().signup().post({ body: userData }).execute()
    const { email, password } = userData
    const userObj = { username: email, password }

    const response = await passwordFlowClient(userObj).me().login().post({ body: { email, password } }).execute()

    return response
  } catch (err) {
    throw new Error(String(err))
  }
}
