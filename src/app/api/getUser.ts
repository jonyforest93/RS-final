import { refreshClientCreate } from './refreshtoken'

import type { Customer } from '@commercetools/platform-sdk'

export async function getUser(refreshToken: string): Promise<Customer> {
  const token = refreshToken
  const client = refreshClientCreate(token)
  try {
    const user = await client.me().get().execute()

    return user.body
  } catch (err) {
    throw new Error(String(err))
  }
}
