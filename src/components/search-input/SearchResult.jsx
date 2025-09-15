import React from 'react';
import './SearchResult.css';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

export const SearchResult = ({ result, onSelect, darkMode }) => {
    const { i18n } = useTranslation();
    const language = i18n.language;

    return (
        <div
            className={`search-result${darkMode ? ' dark' : ''}`}
            onClick={() => onSelect(result)}
        >
            {result.title?.[language]}
        </div>
    );
};
