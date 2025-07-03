import './FooterComponent.css'
import {Box, Slider, Stack} from "@mui/material";
import {ZoomIn, ZoomOut} from "@mui/icons-material";
import {useContext} from "react";
import {Context, LoadContext} from "../dashboard/Context.tsx";

import "./i18n.js";
import {useTranslation} from "react-i18next";

interface FooterComponentProps {
    componentEnabled?: boolean;
}
export const FooterComponent: React.FC<FooterComponentProps> = ({ componentEnabled = false }) => {

    const {t} = useTranslation();
    const {size, setSize} = useContext(Context);
    const {loadImage} = useContext(LoadContext);

    const handleChange = (_event: Event, newValue: number | number[]) => {
        setSize(newValue as number);
    };

    return (
        <footer>
            {componentEnabled ? (
                <div style={{paddingLeft: '20px'}}>
                    {loadImage + " "} {t('footer.load')}
                </div>
            ):(<div></div>)}
            <div style={{paddingRight: '20px'}}>
                <Box sx={{width: 200}}>
                    <Stack spacing={2} direction="row" sx={{mb: 1}} alignItems="center">
                        <ZoomOut/>
                        <Slider
                            disabled={!componentEnabled}
                            aria-label="Volume" min={1} max={38} value={size}
                            onChange={handleChange}
                            style={componentEnabled ? { color: '#0cacf1' } : {}}
                        />
                        <ZoomIn/>
                    </Stack>
                </Box>
            </div>
        </footer>
    )
}
