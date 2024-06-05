import React, { useEffect, useState } from 'react'

import { getCategory } from 'api/getCategories'
import BaseButton from 'components/shared/BaseButton/BaseButton'

import type { ICategory } from 'api/getCategories'

interface FilterBarProps {
  changeCategory: (category: string, name?: string) => void
  submitPriceRange: (min: string, max: string) => void
  clearFilter: () => void
  submitHeightRange: (min: string, max: string) => void
}

export const FilterBar: React.FC<FilterBarProps> = ({
  changeCategory,
  submitPriceRange,
  clearFilter,
  submitHeightRange,
}) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [minPrice, setMinPrice] = useState<string>('')
  const [maxPrice, setMaxPrice] = useState<string>('')
  const [minHeight, setMinHeight] = useState<string>('')
  const [maxHeight, setMaxHeight] = useState<string>('')
  const handleClickCategory = (event: React.MouseEvent<HTMLLIElement>): void => {
    const node = event.target as HTMLElement
    const [id, name] = node.id.split('_')

    setActiveCategory(id || 'All')

    if (!id) {
      changeCategory('All')
      return
    }

    changeCategory(id, name)
  }

  const handleSubmitPriceRange = (): void => {
    submitPriceRange(minPrice, maxPrice)
    submitHeightRange(minHeight, maxHeight)
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
      <h3 className="list-title mb-[20px]">Category</h3>
      <ul>
        <li
          className={`mb-[12px] list-item cursor-pointer ${activeCategory === 'All' ? 'category-active' : ''}`}
          onClick={handleClickCategory}
        >
          All
        </li>
        {categories.map(item => (
          <li
            className={`mb-[12px] list-item cursor-pointer ${activeCategory === item.id ? 'category-active' : ''}`}
            key={item.id}
            id={`${item.id}_${item.name}`}
            onClick={handleClickCategory}
          >
            {item.name}
          </li>
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
      <h3 className="list-title mt-[40px]">Heigth (cm)</h3>
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
        <BaseButton variant="product-cart" onClick={handleSubmitPriceRange}>
          filter
        </BaseButton>
        <BaseButton variant="product-cart" onClick={handleClearFilter}>
          reset
        </BaseButton>
      </div>
    </div>
  )
}
