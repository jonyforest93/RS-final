import { loginUser } from '../api/loginUser'

jest.mock('../api/apiClients/passwordFlowClient', () => ({
  passwordFlowClient: jest.fn(() => ({
    me: () => ({
      login: () => ({
        post: jest.fn(() => ({
          execute: jest.fn(() => ({
            body: { customer: { password: '123', username: 'test@example.com' } },
          })),
        })),
      }),
    }),
  })),
}))

describe('loginUser', () => {
  it('should return customer data on successful login', async () => {
    const user = { username: 'test@example.com', password: 'password' }
    const customer = await loginUser(user)

    expect(customer).toEqual({ password: '123', username: 'test@example.com' })
  })
})
