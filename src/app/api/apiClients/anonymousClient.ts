import { type AuthMiddlewareOptions, ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'
import { type ByProjectKeyRequestBuilder, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

import { appConstants } from '../../constants'

export const projectKey = appConstants['PROJECT_KEY']
const scopes = [appConstants['SCOPES']]

export const authMiddlewareOptions = (): AuthMiddlewareOptions => ({
  host: appConstants['AUTH_URL'],
  projectKey,
  credentials: {
    clientId: appConstants['CLIENT_ID'],
    clientSecret: appConstants['CLIENT_SECRET'],
  },
  scopes,
  fetch,
})
export const httpMiddlewareOptions = (): HttpMiddlewareOptions => ({
  host: appConstants['API_URL'],
  fetch,
})

export function anonymousClient(): ByProjectKeyRequestBuilder {
  const client = new ClientBuilder()
    .withProjectKey(projectKey)
    .withAnonymousSessionFlow(authMiddlewareOptions())
    .withHttpMiddleware(httpMiddlewareOptions())
    .withLoggerMiddleware()
    .build()

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey })
}
