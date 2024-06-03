import { ClientBuilder, type TokenCache } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

import { tokenData } from 'services/token-storage'

import { appConstants } from '../../constants'
import { httpMiddlewareOptions, projectKey } from './anonymousClient'

import type { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk'

interface RefreshAuthMiddlewareOptions {
  host: string
  projectKey: string
  credentials: {
    clientId: string
    clientSecret: string
  }
  refreshToken: string
  tokenCache?: TokenCache
  oauthUri?: string
  fetch?: unknown
}

const refresh: (token: string) => RefreshAuthMiddlewareOptions = token => {
  return {
    host: appConstants['AUTH_URL'],
    projectKey,
    credentials: {
      clientId: appConstants['CLIENT_ID'],
      clientSecret: appConstants['CLIENT_SECRET'],
    },
    refreshToken: token,
    tokenCache: tokenData,
    scopes: [`manage_project:${projectKey}`],
    fetch,
  }
}

export const refreshClientCreate: (token: string) => ByProjectKeyRequestBuilder = token => {
  const client = new ClientBuilder()
    .withRefreshTokenFlow(refresh(token))
    .withHttpMiddleware(httpMiddlewareOptions())
    .withLoggerMiddleware()
    .build()

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey })
}
