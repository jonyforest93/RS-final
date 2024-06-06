import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import { getProducts } from 'api/getProducts'
import { sortByName, sortByPrice } from 'api/sortProducts'
import { searchProducts } from 'api/searchProducts'
import { getProductByategory } from 'api/getProductByCategory'
import { getProductsFiltered } from 'api/getProductsFiltered'

import { SearchBar } from './SearchBar'
import { SortBar } from './SortBar'
import { FilterBar } from './FilterBar'
import { ProductList } from './ProductList'

import type { IProduct } from 'types/types'

export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [searchedProducts, setSearchedProduct] = useState<IProduct[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [currentCategory, setCurrentCategory] = useState<string>('All')
  const location = useLocation()
  const [isBouquets, setBouquetsStatus] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/catalog') {
      getProducts()
        .then((res: IProduct[]) => {
          setProducts(res)
        })
        .catch(error => {
          console.error('Error', error)
        })
    }

    if (location.pathname === '/catalog/Bouquets') {
      getProductByategory('6da3cfe6-1673-406f-bb13-eb0c0a4a7a62')
        .then((res: IProduct[]) => {
          setProducts(res)
          setBouquetsStatus(true)
        })
        .catch(error => {
          console.error('Error', error)
        })
    }
  }, [location.pathname])

  useEffect(() => {
    navigate('/catalog/all')
    getProducts()
      .then((res: IProduct[]) => {
        setProducts(res)
      })
      .catch(error => {
        console.error('Error', error)
      })
  }, [])

  const handleSearch = useDebouncedCallback((searchTerm: string): void => {
    searchProducts(searchTerm)
      .then(res => {
        setSearchedProduct(res)
      })
      .catch(error => {
        console.error(error)
      })
  }, 300)

  const handleSortChange = (sortCategory: string, sortDirection: string): void => {
    if (sortCategory === '') {
      return
    }

    if (sortCategory === 'price') {
      sortByPrice(sortDirection)
        .then(res => {
          setProducts(res)
        })
        .catch(error => {
          console.error(error)
        })
    }
    if (sortCategory === 'name') {
      sortByName(sortDirection)
        .then(res => {
          setProducts(res)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  const handleCategoryChange = (id: string, current?: string): void => {
    if (current === currentCategory) {
      return
    }

    if (id === 'All') {
      setCurrentCategory('All')
      getProducts()
        .then((res: IProduct[]) => {
          setProducts(res)
        })
        .catch(error => {
          console.error('Error', error)
        })

      return
    }

    if (current) {
      setCurrentCategory(current)
      if (current !== 'Bouquets') {
        getProductByategory(id)
          .then(res => {
            setProducts(res)
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }

  const handleClearFilter = (): void => {
    setSearchText('')
    getProducts()
      .then((res: IProduct[]) => {
        setProducts(res)
      })
      .catch(error => {
        console.error('Error', error)
      })
  }

  const handleFilter = (minPrice: string, maxPrice: string, minHeight: string, maxHeight: string): void => {
    const formattedMinPrice = minPrice ? String(Number(minPrice) * 100) : '0'
    const formattedMaxPrice = maxPrice ? String(Number(maxPrice) * 100) : '100000'
    const formattedMinHeight = minHeight || '0'
    const formattedMaxHeight = maxHeight || '100'

    getProductsFiltered(formattedMinPrice, formattedMaxPrice, formattedMinHeight, formattedMaxHeight)
      .then(res => {
        setProducts(res)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div className="relative min-h-[100svh] overflow-hidden">
      <img src="/images/catalogPageImg/flower-left.png" alt="flower" className="absolute z-[2]" />
      <img src="/images/catalogPageImg/flower-right.png" alt="flower" className="absolute right-0 z-[2]" />
      <img src="/images/catalogPageImg/ellipse-l1.png" alt="ellipse" className="absolute top-[100px] z-[1]" />
      <img src="/images/catalogPageImg/ellipse-l2.png" alt="ellipse" className="absolute top-[550px] z-[1]" />
      <img src="/images/catalogPageImg/ellipse-l3.png" alt="ellipse" className="absolute top-[750px] z-[1]" />
      <img src="/images/catalogPageImg/elipse-r-t.png" alt="ellipse" className="absolute right-0 z-[1]" />
      <div className="container relative z-20 mx-auto mt-[120px]">
        <div className="my-blur flex flex-col items-start justify-start">
          <h2 className="title">Flower</h2>
          <h2 className="title ml-[20px] md:ml-[80px] ">Catalog</h2>
          <p className="basic-text ml-[20px] md:ml-[80px] ">
            Our store has the largest selection of bouquets for any event:
          </p>
        </div>

        <div className="catalog-layout mt-[60px]">
          <div>
            <FilterBar
              changeCategory={handleCategoryChange}
              submintFilter={handleFilter}
              clearFilter={handleClearFilter}
            />
          </div>

          <div>
            <div className="mb-[40px] flex flex-col items-center justify-start gap-[20px] md:flex-row md:justify-between">
              <SearchBar onSearch={handleSearch} searchText={searchText} setSearchText={setSearchText} />
              <SortBar onSortChange={handleSortChange} />
            </div>
            {isBouquets ? null : (
              <Routes>
                <Route
                  path={currentCategory}
                  element={
                    <div>
                      <ProductList products={products} searchedProducts={searchedProducts} searchText={searchText} />
                    </div>
                  }
                />
              </Routes>
            )}

            {location.pathname === '/catalog' ? (
              <ProductList products={products} searchedProducts={searchedProducts} searchText={searchText} />
            ) : null}
            {isBouquets ? (
              <ProductList products={products} searchedProducts={searchedProducts} searchText={searchText} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
