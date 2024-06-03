import React, { useEffect, useState } from 'react'

import { getCategory } from 'api/getCategories'

import type { ICategory } from 'api/getCategories'

interface FilterBarProps {
  changeCategory: (category: string, name?: string) => void
}

export const FilterBar: React.FC<FilterBarProps> = ({ changeCategory }) => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('All')

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
      <div className="flex w-full justify-between">
        <div className="flex justify-between gap-2">
          <label htmlFor="minValue" className="basic-text">
            from
          </label>
          <input type="number" className=" w-[60px]" />
        </div>

        <div className="flex justify-between gap-2">
          <label htmlFor="maxValue" className="basic-text ">
            to
          </label>
          <input type="number" className="w-[60px]" />
        </div>
      </div>
    </div>
  )
}
