import { createRootRoute, Outlet } from '@tanstack/react-router'
import {HeaderComponent} from "../base/HeaderComponent.tsx";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useState} from "react";
import {ThemeType} from "../base/model.ts";
import {ThemeContext} from "../context/ThemeContext.tsx";

const RouteComponent = () => {
    const themeChange = (theme: ThemeType) => {
        setThemeType(theme);
    }

    const [themeType, setThemeType] = useState<ThemeType>('light')
    const theme = createTheme({ palette: { mode: themeType } });

    return (
        <ThemeContext.Provider value={{ themeType, changeTheme: themeChange }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <HeaderComponent/>
                <Outlet />
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export const Route = createRootRoute({
    component: RouteComponent
});