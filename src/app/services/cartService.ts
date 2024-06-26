class CartService {
  private cartId: string | undefined
  private productsIds: string[] = []

  public getCartId(): string | undefined {
    if (!this.cartId) {
      return
    }
    return this.cartId
  }

  public addProductId(id: string): void {
    this.productsIds.push(id)
  }

  public getProductsIds(): string[] {
    return this.productsIds
  }
  public addCartId(id: string | undefined): void {
    this.cartId = id
  }
}

export const cartService = new CartService()
