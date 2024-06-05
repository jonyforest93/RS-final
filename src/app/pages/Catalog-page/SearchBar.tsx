import React from 'react'

interface SearchBarProps {
  onSearch: (searchTerm: string) => void
  searchText: string
  setSearchText: (text: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchText, setSearchText }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setSearchText(value)
    onSearch(value)
  }

  return (
    <div className="search-bar w-full px-[40px] md:px-0">
      <input
        type="text"
        placeholder="Search for products...(min 3 letter)"
        value={searchText}
        onChange={handleInputChange}
        className="search-input basic-text w-full px-4 md:w-[280px]"
      />
    </div>
  )
}
