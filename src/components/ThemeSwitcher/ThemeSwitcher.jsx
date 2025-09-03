import { Sun, Moon } from "lucide-react";

const ThemeSwitcher = ({ darkMode, setDarkMode }) => {
    return (
        <li className="night-mode">
            <input
                type="checkbox"
                id="night-mode"
                className="mode-checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
            />
            <label htmlFor="night-mode">
                {darkMode ? (
                    <Sun className="right-icons" />
                ) : (
                    <Moon className="right-icons" />
                )}
            </label>
        </li>
    );
};

export default ThemeSwitcher;
