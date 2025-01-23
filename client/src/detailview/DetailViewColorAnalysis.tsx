import './DetailView.css'
import {Instance} from "../types/instance.ts";
import { useTranslation } from 'react-i18next';

interface Props{
    instance: Instance
}
export const DetailViewColorAnalysis = ({instance}: Props) => {

    const { t } = useTranslation();
    return (
        <>
            <b>{t('detailview.hue')}{": " }</b>{instance && instance.instanceMetaData.hue}<br></br>
            <b>{t('detailview.saturation')}{": " }</b>{instance && instance.instanceMetaData.saturation}<br></br>
            <b>{t('detailview.brightness')}{": " }</b>{instance && instance.instanceMetaData.brightness}<br></br>
            <b>{t('detailview.coverage')}{": " }</b>{instance && instance.instanceMetaData.coverage}<br></br>
        </>
    )
}