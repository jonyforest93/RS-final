import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import { getCategory } from 'api/getCategories'
import BaseButton from 'components/shared/BaseButton/BaseButton'
import { Breadcrumbs } from 'components/breadcrumbs/BreadCrumbs'

import type { ICategory } from 'api/getCategories'

interface FilterBarProps {
  changeCategory: (category: string, name?: string) => void
  submintFilter: (minPrice: string, maxPrice: string, minHeight: string, maxHeight: string) => void
  clearFilter: () => void
}

export const FilterBar: React.FC<FilterBarProps> = ({ changeCategory, submintFilter, clearFilter }) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [minHeight, setMinHeight] = useState<string>('')
  const [maxHeight, setMaxHeight] = useState<string>('')
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/catalog') {
      setActiveCategory('All')
      return
    }
    if (location.pathname === '/catalog/Bouquets') {
      setActiveCategory('6da3cfe6-1673-406f-bb13-eb0c0a4a7a62')
    }
  }, [location.pathname])

  const handleClickCategory = (event: React.MouseEvent<HTMLLIElement>): void => {
    const node = event.target as HTMLElement
    const [id, name] = node.id.split('_')

    setActiveCategory(id || 'All')

    if (!id) {
      changeCategory('All')
      return
    }
    if (name === 'Monobouquets') {
      changeCategory(id, 'BOUQUETS/MONOBOUQUETS')
      return
    }
    changeCategory(id, name)
  }

  const handleSubmitFilter = (): void => {
    submintFilter(minPrice, maxPrice, minHeight, maxHeight)
  }

  const handleClearFilter = (): void => {
    setActiveCategory('All')
    setMinPrice('')
    setMaxPrice('')
    setMinHeight('')
    setMaxHeight('')
    clearFilter()
  }

  useEffect(() => {
    getCategory()
      .then(res => {
        setCategories(res)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <div className="my-blur mb-4">
      <Breadcrumbs></Breadcrumbs>
      <h3 className="list-title mb-[20px]">Category</h3>
      <ul>
        <Link to={'all'}>
          <li
            className={`mb-[12px] list-item cursor-pointer ${activeCategory === 'All' ? 'category-active' : ''}`}
            onClick={handleClickCategory}
          >
            All
          </li>
        </Link>
        {categories.map(item => (
          <div key={item.id}>
            {item.subCategory ? (
              <>
                <Link to={`${item.name.split(' ').join(' ')}`}>
                  <li
                    className={`mb-[12px] list-item cursor-pointer ${activeCategory === item.id ? 'category-active' : ''}`}
                    id={`${item.id}_${item.name}`}
                    onClick={handleClickCategory}
                  >
                    {item.name}
                  </li>
                </Link>
                <Link to={`${`${item.name}/${item.subCategory.name['en-US'].split(' ').join(' ')}`}`} className="flex">
                  <li
                    className={`mb-[12px] list-item cursor-pointer ${activeCategory === item.subCategory.id ? 'category-active' : ''} ml-3 w-[100%] text-[12px]`}
                    id={`${item.subCategory.id}_${item.subCategory.name['en-US']}`}
                    onClick={handleClickCategory}
                  >
                    {item.subCategory.name['en-US']}
                  </li>
                </Link>
              </>
            ) : (
              <Link to={`${item.name.split(' ').join(' ')}`}>
                <li
                  className={`mb-[12px] list-item cursor-pointer ${activeCategory === item.id ? 'category-active' : ''}`}
                  id={`${item.id}_${item.name}`}
                  onClick={handleClickCategory}
                >
                  {item.name}
                </li>
              </Link>
            )}
          </div>
        ))}
      </ul>
      <h3 className="list-title mt-[40px]">Price</h3>
      <div className="my-[20px] flex w-full justify-center gap-4">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="minValue" className="basic-text">
            from
          </label>
          <input
            type="number"
            className="search-input basic-text w-[60px] px-2"
            value={minPrice}
            onChange={event => {
              setMinPrice(event.target.value)
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <label htmlFor="maxValue" className="basic-text ">
            to
          </label>
          <input
            type="number"
            className="search-input basic-text w-[60px] px-2"
            value={maxPrice}
            onChange={event => {
              setMaxPrice(event.target.value)
            }}
          />
        </div>
      </div>
      <h3 className="list-title mt-[40px]">Height (cm)</h3>
      <div className="my-[20px] flex w-full justify-center gap-4">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="minValue" className="basic-text">
            from
          </label>
          <input
            type="number"
            className="search-input basic-text w-[60px] px-2"
            value={minHeight}
            onChange={event => {
              setMinHeight(event.target.value)
            }}
          />
        </div>

        <div className="flex items-center justify-between gap-2">
          <label htmlFor="maxValue" className="basic-text ">
            to
          </label>
          <input
            type="number"
            className="search-input basic-text w-[60px] px-2"
            value={maxHeight}
            onChange={event => {
              setMaxHeight(event.target.value)
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <BaseButton variant="product-cart" onClick={handleSubmitFilter}>
          filter
        </BaseButton>
        <BaseButton variant="product-cart" onClick={handleClearFilter}>
          reset
        </BaseButton>
      </div>
    </div>
  )
}
