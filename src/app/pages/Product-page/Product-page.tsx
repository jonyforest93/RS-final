import { ProductImages } from './Product-background-images'
import { ProductComponent } from './Product-сomponent'

import type { IproductData } from 'types/types'

export const ProductPage: React.FC<IproductData> = productData => {
  return (
    <main className="relative flex-grow">
      <ProductImages />
      <ProductComponent {...productData} />
    </main>
  )
}
