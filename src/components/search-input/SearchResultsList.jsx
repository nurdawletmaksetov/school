import './SearchResultsList.css';
import { SearchResult } from './SearchResult';

export const SearchResultsList = ({ results, onSelect, darkMode }) => {
    return (
        <div>
            <div className={`result-list${darkMode ? ' dark' : ''}`}>
                {results.map((item) => (
                    <SearchResult darkMode={darkMode} result={item} key={item.id} onSelect={onSelect} />
                ))}
            </div>
        </div>
    );
};
