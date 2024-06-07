export class LocalStorageService {
  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  public getItem(key: string): string | null {
    const item = localStorage.getItem(key)

    if (typeof item === 'string' && item) {
      return item
    }

    return null
  }
  public removeItem(key: string): void {
    localStorage.removeItem(key)
  }
}

export const localStorageService = new LocalStorageService()

export const TOKEN_KEY = 'LoverFlowerToken'
