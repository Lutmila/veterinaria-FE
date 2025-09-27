import { useState, useEffect } from 'react';

export const useSearch = (data = [], searchField = 'nombre') => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item[searchField]?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [data, searchTerm, searchField]);

  return {
    searchTerm,
    filteredData,
    handleSearch
  };
};