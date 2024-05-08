import type { Customer } from '@commercetools/platform-sdk'

// export interface ILoginResponse {
//   id: string
//   version: number
//   versionModifiedAt: string
//   lastMessageSequenceNumber: number
//   createdAt: string
//   lastModifiedAt: string
//   lastModifiedBy: {
//     clientId: string
//     isPlatformClient: boolean
//     customer: {
//       typeId: string
//       id: string
//     }
//   }
//   createdBy: {
//     clientId: string
//     isPlatformClient: boolean
//     customer: {
//       typeId: string
//       id: string
//     }
//     email: string
//     firstName: string
//     lastName: string
//     password: string
//     addresses: []
//     shippingAddressIds: []
//     billingAddressIds: []
//     isEmailVerified: false
//     stores: []
//     authenticationMode: string
//   }
// }

export interface ILoginUser {
  email: string
  password: string
}

export type LoginFunction = (user: ILoginUser) => Promise<Customer>
