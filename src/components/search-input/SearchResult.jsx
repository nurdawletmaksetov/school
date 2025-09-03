import React from 'react';
import './SearchResult.css';

export const SearchResult = ({ result, onSelect, darkMode }) => {
    return (
        <div
            className={`search-result${darkMode ? ' dark' : ''}`}
            onClick={() => onSelect(result)}
        >
            {result.title}
        </div>
    );
};
