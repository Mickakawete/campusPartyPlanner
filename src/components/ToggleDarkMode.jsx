import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext.jsx";
import "../styles/components/toggle-dark-mode.css";

export default function ToggleDarkMode() {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <button
            onClick={toggleDarkMode}
            className="dark-mode-toggle"
            aria-label="Toggle dark mode"
        >
            {darkMode ? '☀️' : '🌙'}
        </button>
    );
}