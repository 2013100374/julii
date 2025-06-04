import { useState, useEffect, useMemo } from 'react';

const useSearch = (initialSearchQuery = {}) => {
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [searchUrl, setSearchUrl] = useState('');

    useEffect(() => {
        const queryString = new URLSearchParams(searchQuery).toString();
        setSearchUrl(queryString ? `?${queryString}` : '');
    }, [searchQuery]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchQuery((prev) => ({
            ...prev,
            [name]: value || ''
        }));
    };

    const handleSubmit = (e, onSearch, setPageNumber) => {
        e.preventDefault();
        setPageNumber && setPageNumber(1); 
        onSearch && onSearch(searchUrl);
    
        const currentUrl = new URL(window.location);
        currentUrl.searchParams.delete('page'); 
        window.history.pushState({}, '', currentUrl.toString()); 
    };
    

    const clearSearch = (onSearch, setPageNumber) => {
        setSearchQuery((prev) => {
            const keys = Object.keys(prev);
            const resetValues = Object.fromEntries(keys.map(key => [key, '']));
            return resetValues;
        });
        setPageNumber && setPageNumber(1);
        onSearch && onSearch('');
    };

    const clearable = useMemo(() => {
        return Object.values(searchQuery).some(value => value !== '');
    }, [searchQuery]);

    return {
        searchQuery,
        setSearchQuery,
        searchUrl,
        handleInputChange,
        handleSubmit,
        clearSearch,
        clearable
    };
};

export default useSearch;
