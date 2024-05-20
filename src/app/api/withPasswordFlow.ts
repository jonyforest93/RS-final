import { ClientBuilder, type TokenCache, type UserAuthOptions } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

import { tokenData } from 'services/token-storage'

import { httpMiddlewareOptions } from './BuildClient'

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
const projectKey = 'rss-kex-shop'

const passwordMiddlewareOptions = (user: UserAuthOptions): PasswordAuthMiddlewareOptions => ({
  host: 'https://auth.eu-central-1.aws.commercetools.com/',
  projectKey,
  credentials: {
    clientId: 'sUWZBcfpb57l2sQ-Z_6Jg_Nr',
    clientSecret: 'vBUllYWxwo_ovAaqB0rpCkMEpJ0v4YPF',
    user,
  },
  tokenCache: tokenData,
  scopes: [`manage_project:${projectKey}`],
  fetch,
})

export function passwordFlowClient(user: UserAuthOptions): ByProjectKeyRequestBuilder {
  const client = new ClientBuilder()
    .withPasswordFlow(passwordMiddlewareOptions(user))
    .withHttpMiddleware(httpMiddlewareOptions)
    .build()

  return createApiBuilderFromCtpClient(client).withProjectKey({ projectKey: 'rss-kex-shop' })
}
