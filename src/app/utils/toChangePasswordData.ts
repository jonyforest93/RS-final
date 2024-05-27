/* eslint-disable @typescript-eslint/naming-convention */
interface IPasswordChangeData {
  currentPassword: string
  newPassword: string
}
interface IPasswordChangeStringData {
  'current Password': string
  'new Password': string
}
export const toChangePasswordData = (data: string): IPasswordChangeData => {
  const parsedData = JSON.parse(data) as IPasswordChangeStringData
  const transformedObject: IPasswordChangeData = {
    currentPassword: parsedData['current Password'],
    newPassword: parsedData['new Password'],
  }

  return transformedObject
}
