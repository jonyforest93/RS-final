import { ClientBuilder, type TokenCache } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

import { tokenData } from 'services/token-storage'

import { httpMiddlewareOptions } from './BuildClient'

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

const projectKey = 'rss-kex-shop'

const refresh: (token: string) => RefreshAuthMiddlewareOptions = token => {
  return {
    host: 'https://auth.eu-central-1.aws.commercetools.com/',
    projectKey: 'test-project-key',
    credentials: {
      clientId: 'sUWZBcfpb57l2sQ-Z_6Jg_Nr',
      clientSecret: 'vBUllYWxwo_ovAaqB0rpCkMEpJ0v4YPF',
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
    .withHttpMiddleware(httpMiddlewareOptions)
    .build()

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: 'rss-kex-shop' })
}
