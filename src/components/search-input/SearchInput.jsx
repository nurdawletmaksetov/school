import { Search } from 'lucide-react';
import './SearchInput.css';
import { useState } from 'react';

export const SearchInput = ({ setResults, darkMode }) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        if (!value.trim()) {
            setResults([]);
            return;
        }

        fetch('https://dummyjson.com/posts')
            .then((response) => response.json())
            .then((json) => {
                const results = json.posts.filter((post) =>
                    post.title.toLowerCase().includes(value.toLowerCase())
                );
                setResults(results);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setResults([]);
            });
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className={`search-dark${darkMode ? ' dark' : ''}`}>
            <div className="input-wrapper">
                <Search size={16} color="#64748B" />
                <input
                    placeholder="Search news..."
                    value={input}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
        </div>
    );
};
