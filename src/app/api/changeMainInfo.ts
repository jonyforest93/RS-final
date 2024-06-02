import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { refreshClientCreate } from './apiClients/refreshTokenClient'

import type { ClientResponse, Customer } from '@commercetools/platform-sdk'

export interface IChangeMainInfoProps {
  firstName: string
  lastName: string
  dateOfBirth: string
  email: string
}
export async function changeMainInfo({
  firstName,
  lastName,
  dateOfBirth,
  email,
}: IChangeMainInfoProps): Promise<Customer | ClientResponse<Customer>> {
  const token = localStorageService.getItem(TOKEN_KEY) as string
  const client = refreshClientCreate(token)
  try {
    return await client
      .me()
      .get()
      .execute()
      .then(user => {
        const customerVersion = user.body.version
        return client
          .me()
          .post({
            body: {
              version: customerVersion,
              actions: [
                {
                  action: 'setFirstName',
                  firstName,
                },
                {
                  action: 'setLastName',
                  lastName,
                },
                {
                  action: 'setDateOfBirth',
                  dateOfBirth,
                },
                {
                  action: 'changeEmail',
                  email,
                },
              ],
            },
          })
          .execute()
      })
  } catch (err) {
    throw new Error(String(err))
  }
}
