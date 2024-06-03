import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { refreshClientCreate } from './apiClients/refreshTokenClient'

export async function deleteAdress(addressId: string): Promise<void> {
  const token = localStorageService.getItem(TOKEN_KEY) as string
  const client = refreshClientCreate(token)
  try {
    await client
      .me()
      .get()
      .execute()
      .then((user: { body: { version: number } }) => {
        const customerVersion = user.body.version
        return client
          .me()
          .post({
            body: {
              version: customerVersion,
              actions: [
                {
                  action: 'removeAddress',
                  addressId,
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
