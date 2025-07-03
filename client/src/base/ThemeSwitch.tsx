import { ThemeType } from './model.ts'
import DarkThemeIcon from '@mui/icons-material/Brightness2'
import LightThemeIcon from '@mui/icons-material/WbSunny'
import { Switch } from '@mui/material'
import { Box } from '@mui/system'

const sxRoot = {
    display: 'grid',
    gridTemplateColumns: 'auto auto auto',
    justifyContent: 'center',
    alignItems: 'center',
}

const sxIcon = {
    margin: 1,
}

interface Props {
    themeType: ThemeType
    onThemeChange: (themeType: ThemeType) => void
}

export const ThemeSwitch = ({ themeType, onThemeChange }: Props) => {
    const isDarkTheme = themeType === 'dark'
    const handleChange = () => onThemeChange(isDarkTheme ? 'light' : 'dark')
    return (
        <Box sx={sxRoot}>
            <LightThemeIcon sx={sxIcon} />
            <Switch checked={isDarkTheme} onChange={handleChange} color={'default'} />
            <DarkThemeIcon sx={sxIcon} />
        </Box>
    )
}
