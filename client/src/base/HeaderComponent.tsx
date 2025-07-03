import './HeaderComponent.css'
import {styled, Switch,} from "@mui/material";
import {useNavigate} from "@tanstack/react-router";
import {useTranslation} from 'react-i18next';
import {useContext} from "react";
import {AuthContext} from "../context/AuthContextProvider.tsx";
import {useTheme} from "../context/ThemeContext.tsx";
import {red} from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';

export const HeaderComponent = () => {

    const {t, i18n} = useTranslation();
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    const {themeType, changeTheme} = useTheme();

    const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTheme = event.target.checked ? 'dark' : 'light';
        changeTheme(newTheme);
    };


    return (

        <header style={{backgroundColor: themeType === 'dark' ? '#999' : '#fee70f', width:'100%'}}>

            <div className="logo">
                <img
                    src={themeType === 'dark' ? 'logo-dark.png' : 'logo-ganz.png'}
                    alt="Logo"
                    onClick={() => {
                        navigate({to: '/'});
                        window.dispatchEvent(new CustomEvent('clearSearch'));
                    }}
                />
            </div>
            <div className="right-wrapper">
                <button
                    className="tag-management-button"
                    onClick={() => navigate({to: '/tagManagement',})}
                    style={{
                        backgroundColor: themeType === 'dark' ? '#999' : '#fee70f',
                        color: themeType === 'dark' ? '#ffffff' : '#000'
                    }}>
                    {t('header.tagmanagement')}
                </button>

                <div className="settings">
                    <div className="settings-button-group"
                         style={{backgroundColor: themeType === 'dark' ? '#333' : '#f7f6f6',}}>
                    <span style={{
                        color: themeType === 'dark' ? '#ffffff' : '#000'
                    }}
                          className="settings-text">{authContext.username ? authContext.username : "User"}</span>
                        <Avatar sx={{bgcolor: red[500], width: 26, height: 26}} aria-label="recipe">
                            {authContext.username?.slice(0, 2)}
                        </Avatar>
                    </div>

                    <div className="settings-menu" style={{
                        backgroundColor: themeType === 'dark' ? '#000' : '#ffffff',
                        color: themeType === 'dark' ? '#ffffff' : '#000'
                    }}>
                        <div className="menu-item">
                            {t('header.nightmode')}
                            <MaterialUISwitch
                                checked={themeType === 'dark'}
                                onChange={handleThemeChange}/>
                        </div>
                        <div className="menu-item">
                            {t('header.language')}
                            <div className="flags">
                                <button onClick={() => i18n.changeLanguage("de")}
                                        style={{background: `url(${'/language/de.svg'}) no-repeat center center`}}/>
                                <button onClick={() => i18n.changeLanguage("en")}
                                        style={{background: `url(${'/language/en.svg'}) no-repeat center center`}}/>
                                <button onClick={() => i18n.changeLanguage("fr")}
                                        style={{background: `url(${'/language/fr.svg'}) no-repeat center center`}}/>
                            </div>
                        </div>
                        <div className="menu-item">
                            <button onClick={() => authContext.logout()}
                                    style={{backgroundColor: themeType === 'dark' ? '#003892' : '#001e3c'}}>
                                {t('header.logout')}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </header>
    );
}


// https://mui.com/material-ui/react-switch/
const MaterialUISwitch = styled(Switch)(({theme}) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));