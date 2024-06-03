import { tokenData } from 'services/token-storage'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import { refreshClientCreate } from './apiClients/refreshTokenClient'
import { loginUser } from './loginUser'

export async function changePassword(
  refreshToken: string,
  currentPassword: string,
  newPassword: string,
): Promise<void> {
  const client = refreshClientCreate(refreshToken)
  try {
    const passwordChangeResponse = await client
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
    tokenData.reset()
    await loginUser({
      username: passwordChangeResponse.body.email,
      password: newPassword,
    })
    const newToken = tokenData.get().refreshToken
    if (newToken) {
      localStorageService.setItem(TOKEN_KEY, newToken)
    }
  } catch (err) {
    throw new Error(String(err))
  }
}
