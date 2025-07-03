import './DetailView.css'
import '../base/i18n.js'
import { useTranslation } from 'react-i18next';
import {Instance} from "../types/instance.ts";
import {useTheme} from "../context/ThemeContext.tsx";

interface Props{
    instance: Instance
}
export const DetailViewDescription = ({instance}: Props) => {

    const { t } = useTranslation();
    const {themeType} = useTheme();
    return (
        <div className="description" style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}>
            <b>{t('detailview.description')}{": " }</b>{instance && instance.MainDicomTags.ImageComments}<br></br>
            <b>{t('detailview.magnification')}{": " }</b>{instance && instance.instanceMetaData.magnification}<br></br>
            <b>{t('detailview.url')}{": " }</b>
            <a href={instance && instance.instanceMetaData.originalURL} style={{color: themeType === 'dark' ? '#ffffff' : '#000000'}}>
                {instance && instance.instanceMetaData.originalURL.replace(/(http:\/\/|https:\/\/)?(www\.)?([^/]+)\/.*/, '$3')}
            </a>
        </div>
    )
}