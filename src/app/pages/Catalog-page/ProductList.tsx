import { Link } from 'react-router-dom'

import { Loading } from 'components/Loading'

import { ProductItem } from './Product-item'

import type { IProduct } from 'types/types'

interface ProductListProps {
  products: IProduct[]
  searchedProducts: IProduct[]
  searchText: string
}

export const ProductList: React.FC<ProductListProps> = ({ products, searchedProducts, searchText }) => {
  return (
    <div className="flex flex-wrap justify-center gap-[30px]">
      {searchText.length > 3 ? (
        searchedProducts.length > 0 ? (
          searchedProducts.map((product, index) => (
            <Link key={`${product.id}-${index}-${Math.random()}`} to={`/product/${product.keyName}`}>
              <ProductItem {...product} />
            </Link>
          ))
        ) : (
          <Loading text="not found product" />
        )
      ) : products.length === 0 ? (
        <Loading text="not found product" />
      ) : (
        products.map(product => (
          <Link key={product.keyName} to={`/product/${product.keyName}`}>
            <ProductItem {...product} />
          </Link>
        ))
      )}
    </div>
  )
}
