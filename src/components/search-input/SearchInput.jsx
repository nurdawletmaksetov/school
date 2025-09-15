import { Search } from 'lucide-react';
import './SearchInput.css';
import { useState } from 'react';
import { api } from '../../api/api';

export const SearchInput = ({ setResults, darkMode }) => {
    const [input, setInput] = useState("");

    const fetchData = async (value) => {
        if (!value.trim()) {
            setResults([]);
            return;
        }

        try {
            const { data } = await api.get("/news"); 
            const items = data.data.items ?? [];

            const results = items.filter((item) =>
                item.title?.uz?.toLowerCase().includes(value.toLowerCase()) ||
                item.title?.ru?.toLowerCase().includes(value.toLowerCase()) ||
                item.title?.en?.toLowerCase().includes(value.toLowerCase()) ||
                item.title?.kk?.toLowerCase().includes(value.toLowerCase())
            );

            setResults(results);
        } catch (error) {
            console.error("Error fetching data:", error);
            setResults([]);
        }
    };

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    };

    return (
        <div className={`search-dark${darkMode ? " dark" : ""}`}>
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
