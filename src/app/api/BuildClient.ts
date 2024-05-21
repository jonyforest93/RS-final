import fetch from 'node-fetch'
import { type AuthMiddlewareOptions, ClientBuilder, type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'

import { appConstants } from '../constants'

export const projectKey = appConstants['PROJECT_KEY']
const scopes = [appConstants['SCOPES']]

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: appConstants['AUTH_URL'],
  projectKey,
  credentials: {
    clientId: appConstants['CLIENT_ID'],
    clientSecret: appConstants['CLIENT_SECRET'],
  },
  scopes,
  fetch,
}

export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: appConstants['API_URL'],
  fetch,
}

export const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withAnonymousSessionFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build()
