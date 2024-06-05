import { ClientBuilder, type TokenCache, type UserAuthOptions } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

import { tokenData } from 'services/token-storage'

import { appConstants } from '../../constants'
import { httpMiddlewareOptions, projectKey } from './anonymousClient'

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'

interface PasswordAuthMiddlewareOptions {
  host: string
  projectKey: string
  credentials: {
    clientId: string
    clientSecret: string
    user: {
      username: string
      password: string
    }
  }
  scopes?: string[]
  tokenCache?: TokenCache
  oauthUri?: string
  fetch?: unknown
}

const passwordMiddlewareOptions = (user: UserAuthOptions): PasswordAuthMiddlewareOptions => ({
  host: appConstants['AUTH_URL'],
  projectKey,
  credentials: {
    clientId: appConstants['CLIENT_ID'],
    clientSecret: appConstants['CLIENT_SECRET'],
    user,
  },
  tokenCache: tokenData,
  scopes: [`manage_project:${projectKey}`],
  fetch,
})

export function passwordFlowClient(user: UserAuthOptions): ByProjectKeyRequestBuilder {
  const client = new ClientBuilder()
    .withPasswordFlow(passwordMiddlewareOptions(user))
    .withHttpMiddleware(httpMiddlewareOptions())
    .withLoggerMiddleware()
    .build()

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey })
}
