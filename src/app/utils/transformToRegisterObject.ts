import type { BaseAddress, MyCustomerDraft } from '@commercetools/platform-sdk'

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
export function transormToRegisisterObject(data: string): MyCustomerDraft {
  const parsedData = JSON.parse(data) as IRegistrationData
  parsedData.addresses = []
  parsedData.dateOfBirth = parsedData.Birthday
  if (parsedData.shippingDefault && parsedData.shippingMatchBilling) {
    parsedData.defaultShippingAddress = 0
    parsedData.defaultBillingAddress = 0
  }
  if (parsedData.shippingDefault && !parsedData.shippingMatchBilling) {
    parsedData.defaultShippingAddress = 0
  }
  if (parsedData.billingDefault) {
    parsedData.defaultBillingAddress = 1
  }
  const finalObj: MyCustomerDraft = { ...parsedData }
  const address: BaseAddress = {
    country: parsedData.country,
    city: parsedData.city,
    streetName: parsedData.streetName,
    postalCode: parsedData.postalCode,
  }
  finalObj.addresses?.push(address)

  if (parsedData.billingcountry) {
    const billingAdress: BaseAddress = {
      country: parsedData.billingcountry,
      city: parsedData.billingcity,
      streetName: parsedData.billingstreetName,
      postalCode: parsedData.billingpostalCode,
    }
    finalObj.addresses?.push(billingAdress)
  }
  return finalObj
}
