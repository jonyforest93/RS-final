import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

import { ctpClient } from './BuildClient'

export const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey: 'rss-kex-shop' })
