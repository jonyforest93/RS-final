import { transormToRegisisterObject } from 'utils/transformToRegisterObject'

import { apiRoot } from './apiRoot'

import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk'

// interface IUserRegistration {
//   email: string
//   firstName: string
//   lastName: string
//   password: string
// }
type RegistrationFunction = (user: string) => Promise<ClientResponse<CustomerSignInResult>>

export const registration: RegistrationFunction = async user => {
  const userData = transormToRegisisterObject(user)
  try {
    const response = await apiRoot.me().signup().post({ body: userData }).execute()

    return response
  } catch {
    throw new Error('Registration Error')
  }
}
