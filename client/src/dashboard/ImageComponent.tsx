import { useState, useEffect } from 'react';
import {dataService} from "./DataService.ts";
import {Instance} from "../types/instance.ts";
import {useNavigate} from '@tanstack/react-router'

interface ImageComponentProps {
    item: Instance;
}
const ImageComponent: React.FC<ImageComponentProps> = ({ item }) => {
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await dataService.findPreview(item.ID);
                const imageUrl = URL.createObjectURL(response.data);
                setImageUrl(imageUrl);
            } catch (error) {
                console.error('Fehler beim Abrufen des Bildes:', error);
            }
        };
        fetchImage();
    }, []);

    return (
        <>
            {imageUrl ? (
                <img src={imageUrl}
                     title={item.MainDicomTags.ImageComments}
                     onClick={() =>
                         navigate({
                             to: '/detailView',
                             search: {id: item.ID,
                                 uid: item.MainDicomTags.SOPInstanceUID.substring(item.MainDicomTags.SOPInstanceUID.lastIndexOf('.')+1)}
                         })
                     }
                />
            ) : (
                <p>Bild wird geladen</p>
            )}
        </>
    );
};
export default ImageComponent;
