import React, {createContext, useContext, useState} from "react";
import {ThemeType} from "../base/model.ts";

interface ThemeContextType {
    themeType: ThemeType;
    changeTheme: (theme: ThemeType) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    themeType: 'light',
    changeTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [themeType, setThemeType] = useState<ThemeType>('light');

    const changeTheme = (theme: ThemeType) => {
        setThemeType(theme);
    };

    return (
        <ThemeContext.Provider value={{ themeType, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};