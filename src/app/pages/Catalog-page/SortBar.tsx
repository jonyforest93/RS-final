import React from 'react'

interface SortBarProps {
  onSortChange: (sortCategory: string, sortDirection: string) => void
}

export const SortBar: React.FC<SortBarProps> = ({ onSortChange }) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const [sortCategory, sortDirection] = event.target.value.split('-')
    onSortChange(sortCategory, sortDirection)
  }

  return (
    <div className="search-bar w-full px-[40px] text-right md:px-0">
      <select id="sort" onChange={handleSortChange} className="search-input basic-text w-full px-4 md:w-[280px]">
        <option value="">Select Sorting</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
        <option value="name-asc">Name (A to Z)</option>
        <option value="name-desc">Name (Z to A)</option>
      </select>
    </div>
  )
}
