import { apiRoot } from './apiRoot'

import type { ClientResponse, CustomerSignInResult } from '@commercetools/platform-sdk'

interface IUserRegistration {
  email: string
  firstName: string
  lastName: string
  password: string
}
type RegistrationFunction = (user: IUserRegistration) => Promise<ClientResponse<CustomerSignInResult>>

export const registration: RegistrationFunction = async user => {
  try {
    const response = await apiRoot.me().signup().post({ body: user }).execute()

    return response
  } catch {
    throw new Error('Registration Error')
  }
}
