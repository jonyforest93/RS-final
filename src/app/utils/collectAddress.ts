export interface ICollectedAddress {
  country: string | undefined
  city: string | undefined
  streetName: string | undefined
  postalCode: string | undefined
}
export interface ICollectedAddressField {
  id: string | undefined
  radioOption: string | null
  address: ICollectedAddress
}
export const collectAddresses: (data: Record<string, string | undefined>) => ICollectedAddressField[] = data => {
  const addresses = []
  let index = 0

  while (data[`country${index}`] !== undefined) {
    const addressData = {
      id: data[`id${index}`],
      radioOption: data[`${index}radioOption`] || null,
      address: {
        country: data[`country${index}`],
        city: data[`city${index}`],
        streetName: data[`streetName${index}`],
        postalCode: data[`postalCode${index}`],
      },
    }
    addresses.push(addressData)
    index += 1
  }

  return addresses
}
