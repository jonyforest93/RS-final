import { refreshClientCreate } from './apiClients/refreshTokenClient'

import type { ClientResponse, Customer, Project } from '@commercetools/platform-sdk'

export async function changePassword(
  refreshToken: string,
  currentPassword: string,
  newPassword: string,
): Promise<ClientResponse<Customer> | ClientResponse<Project>> {
  const client = refreshClientCreate(refreshToken)
  try {
    return await client
      .me()
      .get()
      .execute()
      .then(user => {
        const customerVersion = user.body.version
        return client
          .me()
          .password()
          .post({ body: { version: customerVersion, currentPassword, newPassword } })
          .execute()
      })
  } catch (err) {
    throw new Error(String(err))
  }
}
