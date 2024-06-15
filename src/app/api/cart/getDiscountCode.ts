import { anonymousClient } from 'api/apiClients/anonymousClient'
import { refreshClientCreate } from 'api/apiClients/refreshTokenClient'
import { TOKEN_KEY, localStorageService } from 'services/local-storage-service'

import type { DiscountCode } from '@commercetools/platform-sdk'

export async function getDiscountCode(): Promise<DiscountCode[]> {
  const token = localStorageService.getItem(TOKEN_KEY)

  const client = token ? refreshClientCreate(token) : anonymousClient()
  try {
    const {
      body: { results },
    } = await client.discountCodes().get().execute()
    return results
  } catch (err) {
    throw new Error(String(err))
  }
}
