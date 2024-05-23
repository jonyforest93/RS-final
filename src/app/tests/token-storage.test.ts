import { TokenInfo, initialTokenInfo } from 'services/token-storage'

describe('TokenInfo', () => {
  let tokenInfo: TokenInfo

  beforeEach(() => {
    tokenInfo = new TokenInfo()
  })

  it('should have initial token info', () => {
    expect(tokenInfo.get()).toEqual(initialTokenInfo)
  })

  it('should set new token info', () => {
    const newTokenInfo = {
      token: 'newToken',
      expirationTime: 1000,
      refreshToken: 'newRefreshToken',
    }

    tokenInfo.set(newTokenInfo)

    expect(tokenInfo.get()).toEqual(newTokenInfo)
  })
})
