import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
// eslint-disable-next-line import/no-extraneous-dependencies
import InfiniteScroll from 'react-infinite-scroll-component'

import { getProducts } from 'api/getProducts'
import { sortByName, sortByPrice } from 'api/sortProducts'
import { searchProducts } from 'api/searchProducts'
import { getProductByCategory } from 'api/getProductByCategory'
import { getProductsFiltered } from 'api/getProductsFiltered'

import { SearchBar } from './SearchBar'
import { SortBar } from './SortBar'
import { FilterBar } from './FilterBar'
import { ProductList } from './ProductList'
import { CatalogPageImages } from './CatalogPageImages'

import type { IProduct } from 'types/types'

export const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([])
  const [page, setPage] = useState<number>(1)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [searchedProducts, setSearchedProduct] = useState<IProduct[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [currentCategory, setCurrentCategory] = useState<string>('All')
  const location = useLocation()
  const [isBouquets, setBouquetsStatus] = useState<boolean>(true)

  const navigate = useNavigate()

  const fetchProducts = async (pageNumber: number): Promise<void> => {
    try {
      const newProducts = await getProducts(pageNumber)

      setProducts(prevProducts => [...prevProducts, ...newProducts])
      if (newProducts.length === 0) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Error', error)
    }
  }

  useEffect(() => {
    navigate('/catalog/all')
    getProducts(page)
      .then((res: IProduct[]) => {
        setProducts(res)
      })
      .catch(error => {
        console.error('Error', error)
      })
  }, [])

  useEffect(() => {
    setPage(1)
    setProducts([])
    setHasMore(true)
    if (location.pathname === '/catalog') {
      setBouquetsStatus(false)
      void fetchProducts(1)
    } else if (location.pathname === '/catalog/Bouquets') {
      setBouquetsStatus(true)
      getProductByCategory('6da3cfe6-1673-406f-bb13-eb0c0a4a7a62')
        .then((res: IProduct[]) => {
          setProducts(res)
          setHasMore(false)
        })
        .catch(error => {
          console.error('Error', error)
        })
    }
  }, [])

  useEffect(() => {
    setPage(1)
    setProducts([])
    setHasMore(true)
    if (location.pathname === '/catalog') {
      setBouquetsStatus(false)
      getProducts(page)
        .then((res: IProduct[]) => {
          setProducts(res)
        })
        .catch(error => {
          console.error('Error', error)
        })
    }
    if (location.pathname === '/catalog/Bouquets') {
      getProductByCategory('6da3cfe6-1673-406f-bb13-eb0c0a4a7a62')
        .then((res: IProduct[]) => {
          setProducts(res)
          setBouquetsStatus(false)
        })
        .catch(error => {
          console.error('Error', error)
        })
    }
  }, [location.pathname])

  const handleSearch = useDebouncedCallback((searchTerm: string): void => {
    searchProducts(searchTerm)
      .then(res => {
        setSearchedProduct(res)
        setHasMore(false)
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

    setCurrentCategory(current || 'All')
    setPage(1)
    setProducts([])
    setHasMore(true)

    if (id === 'All') {
      void fetchProducts(1)
      return
    }

    if (current) {
      if (current !== 'Bouquets') {
        getProductByCategory(id)
          .then(res => {
            setProducts(res)
            setHasMore(false)
          })
          .catch(err => {
            console.error(err)
          })
      }
    }
  }

  const handleClearFilter = (): void => {
    setSearchText('')
    setPage(1)
    setProducts([])
    setHasMore(true)
    void fetchProducts(1)
  }

  const handleFilter = (minPrice: string, maxPrice: string, minHeight: string, maxHeight: string): void => {
    const formattedMinPrice = minPrice ? String(Number(minPrice) * 100) : '0'
    const formattedMaxPrice = maxPrice ? String(Number(maxPrice) * 100) : '100000'
    const formattedMinHeight = minHeight || '0'
    const formattedMaxHeight = maxHeight || '100'

    getProductsFiltered(formattedMinPrice, formattedMaxPrice, formattedMinHeight, formattedMaxHeight)
      .then(res => {
        setProducts(res)
        setHasMore(false)
      })
      .catch(error => {
        console.error(error)
      })
  }

  const loadMore = (): void => {
    setPage(prevPage => prevPage + 1)
    void fetchProducts(page + 1)
  }

  return (
    <div className="relative min-h-[100svh] overflow-hidden">
      <CatalogPageImages />
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
                      <InfiniteScroll
                        dataLength={products.length}
                        next={loadMore}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                          <p className="text-white" style={{ textAlign: 'center' }}>
                            <b>You have seen all products</b>
                          </p>
                        }
                      >
                        <ProductList products={products} searchedProducts={searchedProducts} searchText={searchText} />
                      </InfiniteScroll>
                    </div>
                  }
                />
              </Routes>
            )}

            {location.pathname === '/catalog' ? (
              <InfiniteScroll
                dataLength={products.length}
                next={loadMore}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{ textAlign: 'center' }}>
                    <b>You have seen all products</b>
                  </p>
                }
              >
                <ProductList products={products} searchedProducts={searchedProducts} searchText={searchText} />
              </InfiniteScroll>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
