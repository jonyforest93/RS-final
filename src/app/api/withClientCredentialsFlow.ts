import { ClientBuilder } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

import { authMiddlewareOptions, httpMiddlewareOptions, projectKey } from './BuildClient'

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'

export function apiRootCredentials(): ByProjectKeyRequestBuilder {
  const ctpClient = new ClientBuilder()
    .withProjectKey(projectKey)
    .withClientCredentialsFlow(authMiddlewareOptions())
    .withHttpMiddleware(httpMiddlewareOptions())
    .build()

  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey })
}
