import React, { useState } from 'react'

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setSearchTerm(value)
    onSearch(value)
  }

  return (
    <div className="search-bar w-full px-[40px] md:px-0">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={handleInputChange}
        className="search-input basic-text w-full px-4 md:w-[280px]"
      />
    </div>
  )
}
