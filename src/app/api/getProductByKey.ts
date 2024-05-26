import { apiRootCredentials } from 'api/withClientCredentialsFlow'

import type { Product } from '@commercetools/platform-sdk'
export async function getProductByKey(key: string): Promise<Product> {
  const response = await apiRootCredentials().products().withKey({ key }).get().execute()

  return response.body
}
