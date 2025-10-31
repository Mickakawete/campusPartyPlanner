import { createContext, useState, useEffect } from 'react'

export const DarkModeContext = createContext();

export default function DarkModeProvider({ children  }) {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            return JSON.parse(savedMode);
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });


    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));

        if (darkMode) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }, [darkMode]);

    function toggleDarkMode() {
        setDarkMode(!darkMode);
    }

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            { children }
        </DarkModeContext.Provider>
    )
}