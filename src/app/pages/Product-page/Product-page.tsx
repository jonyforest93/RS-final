import { ProductImages } from './Product-background-images'
import { Product } from './Product'

export const ProductPage: React.FC = () => {
  return (
    <main className="relative flex-grow ">
      <ProductImages />
      <Product />
    </main>
  )
}
