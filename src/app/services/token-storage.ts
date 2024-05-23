import type { TokenStore } from '@commercetools/sdk-client-v2'

export const initialTokenInfo: TokenStore = {
  token: '',
  expirationTime: 0,
  refreshToken: '',
}

export class TokenInfo {
  private store: TokenStore = initialTokenInfo

  public get(): TokenStore {
    return this.store
  }

  public set(data: TokenStore): void {
    this.store = data
  }
}

export const tokenData = new TokenInfo()
