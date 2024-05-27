import { ProductImages } from './ProductBackgroundImages'
import { ProductComponent } from './ProductComponent'

import type { IproductData } from 'types/types'

export const ProductPage: React.FC<IproductData> = productData => {
  return (
    <main className="relative flex-grow">
      <ProductImages />
      <ProductComponent {...productData} />
    </main>
  )
}
