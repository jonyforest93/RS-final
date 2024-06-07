import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { refreshClientCreate } from './apiClients/refreshTokenClient'

export const getCustomerVersion = async (): Promise<number> => {
  const token = localStorageService.getItem(TOKEN_KEY) as string
  const client = refreshClientCreate(token)
  try {
    const user = (await client.me().get().execute()).body.id
    const { version } = (await client.customers().withId({ ID: user }).get().execute()).body
    return version
  } catch {
    throw new Error('Mistake')
  }
}
