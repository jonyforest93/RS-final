import { ClientBuilder, type TokenCache, type TokenStore, type UserAuthOptions } from '@commercetools/sdk-client-v2'
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk'

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

export const initialTokenInfo: TokenStore = {
  token: '',
  expirationTime: 0,
  refreshToken: '',
}

class TokenInfo {
  private store: TokenStore = initialTokenInfo

  public get(): TokenStore {
    return this.store
  }

  public set(data: TokenStore): void {
    this.store = data
  }
}

export const tokenData = new TokenInfo()

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
