import type { BaseAddress } from '@commercetools/platform-sdk'

/* eslint-disable @typescript-eslint/naming-convention */
export interface IRegistrationData {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  country: string
  billingcountry: string
  city: string
  billingcity: string
  streetName: string
  billingstreetName: string
  postalCode: string
  billingpostalCode: string
  shippingDefault?: boolean
  shippingMatchBilling: boolean
  billingDefault?: boolean
  addresses: BaseAddress[]
  defaultShippingAddress?: number
  defaultBillingAddress?: number
  Birthday: string
}

export interface ICustomCustomerDraft {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
  addresses: BaseAddress[]
  billingAddresses: number[]
  shippingAddresses: number[]
  defaultShippingAddress?: number
  defaultBillingAddress?: number
}
const createAdress: (city: string, streetName: string, postalCode: string) => BaseAddress = (
  city,
  streetName,
  postalCode,
) => {
  return {
    country: 'US',
    city,
    streetName,
    postalCode,
  }
}
export function transormToRegisisterObject(data: string): ICustomCustomerDraft {
  const parsedData = JSON.parse(data) as IRegistrationData
  const finalObj: ICustomCustomerDraft = {
    email: parsedData.email,
    password: parsedData.password,
    firstName: parsedData.firstName,
    lastName: parsedData.lastName,
    dateOfBirth: parsedData.Birthday,
    addresses: [],
    billingAddresses: [],
    shippingAddresses: [],
  }
  const shippingAdress: BaseAddress = createAdress(parsedData.city, parsedData.streetName, parsedData.postalCode)

  finalObj.addresses.push(shippingAdress)
  finalObj.shippingAddresses.push(0)

  if (parsedData.shippingDefault) {
    finalObj.defaultShippingAddress = 0
  }

  if (parsedData.billingcity) {
    const billingAdress = createAdress(
      parsedData.billingcity,
      parsedData.billingstreetName,
      parsedData.billingpostalCode,
    )
    finalObj.addresses.push(billingAdress)
    finalObj.billingAddresses.push(1)

    if (parsedData.billingDefault) {
      finalObj.defaultBillingAddress = 1
    }
  }

  if (parsedData.shippingMatchBilling) {
    finalObj.billingAddresses.push(0)
  }

  return finalObj
}
