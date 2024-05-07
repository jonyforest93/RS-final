import fetch from 'node-fetch'
import { type AuthMiddlewareOptions, ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'

const projectKey = 'rss-kex-shop'
const scopes = ['manage_project:rss-kex-shop']

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.eu-central-1.aws.commercetools.com/',
  projectKey,
  credentials: {
    clientId: 'sUWZBcfpb57l2sQ-Z_6Jg_Nr',
    clientSecret: 'vBUllYWxwo_ovAaqB0rpCkMEpJ0v4YPF',
  },
  scopes,
  fetch,
}

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.eu-central-1.aws.commercetools.com/',
  fetch,
}

// Export the ClientBuilder
export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build()
