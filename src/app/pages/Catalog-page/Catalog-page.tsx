import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getProducts } from 'api/getProducts'

import { ProductItem } from './Product-item'

import type { IProduct } from 'api/getProducts'

export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    getProducts()
      .then((res: IProduct[]) => {
        setProducts(res)
      })
      .catch(error => {
        console.error('Ошибка при получении продуктов:', error)
      })
  })

  return (
    <div className="relative">
      <img src="images/catalogPageImg/flower-left.png" alt="flower" className="absolute z-[2]" />
      <img src="images/catalogPageImg/flower-right.png" alt="flower" className="absolute right-0 z-[2]" />
      <img src="images/catalogPageImg/ellipse-l1.png" alt="ellipse" className="absolute top-[100px] z-[1]" />
      <img src="images/catalogPageImg/ellipse-l2.png" alt="ellipse" className="absolute top-[550px] z-[1]" />
      <img src="images/catalogPageImg/ellipse-l3.png" alt="ellipse" className="absolute top-[750px] z-[1]" />
      <img src="images/catalogPageImg/elipse-r-t.png" alt="ellipse" className="absolute right-0 z-[1]" />
      <div className="container relative z-20 mx-auto mt-[120px]">
        <div className="my-blur flex flex-col items-start justify-start">
          <h2 className="title">Flower</h2>
          <h2 className="title ml-[20px] md:ml-[80px] ">Catalog</h2>
          <p className="basic-text ml-[20px] md:ml-[80px] ">
            Our store has the largest selection of bouquets for any event:
          </p>
        </div>

        <div className="mt-[60px]">
          <div></div>
          <div className="flex justify-center">
            <div className="grid grid-cols-1 justify-center gap-[30px] sm:grid-cols-2 md:grid-cols-3">
              {products.map(product => (
                <Link key={product.key} to={`/product/${product.key}`}>
                  <ProductItem key={product.key} {...product} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
