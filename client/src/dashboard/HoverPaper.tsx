import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {Instance} from "../types/instance.ts";
import {useEffect, useLayoutEffect, useRef, useState} from "react";


const InstancePaper = styled(Paper)(({theme}) => ({
    width: 300,
    position: 'absolute',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    zIndex: 999,
}))

interface Props{
    instance: Instance
}

export const HoverPaper = ({ instance }: Props) => {
    let tags: string;
    if (!instance.instanceMetaData.tags) {
        tags = "";
    } else {
        tags = instance.instanceMetaData.tags.map(tag => tag.namespace).join(", ");
    }

    const [position, setPosition] = useState({x: -500, y: -500});
    const [paperHeight, setPaperHeight] = useState(0);
    const paperRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (paperRef.current) {
            setPaperHeight(paperRef.current.clientHeight);
        }
    }, [paperHeight]);

    useEffect(() => {
        const updatePosition = (e: MouseEvent) => {
            const screenWidth = window.innerWidth;
            const screenHeight  = window.innerHeight;
            const scrollX = window.scrollX;
            const scrollY = window.scrollY;
            const x = e.clientX;
            const y = e.clientY;

            let newPositionX = x + (screenWidth/2) > screenWidth ? x - 340 : x;
            let newPositionY = y + (screenHeight/2) > screenHeight ? y - (paperHeight+40) : y;

            newPositionX += scrollX +20;
            newPositionY += scrollY +20;

            setPosition({ x: newPositionX, y: newPositionY });
        };

        window.addEventListener('mousemove', updatePosition);

        return () => {
            window.removeEventListener('mousemove', updatePosition);
        }
    }, [paperHeight]);



    return (
        <InstancePaper ref={paperRef} square={false} elevation={8} style={{top: position.y, left: position.x}}>
            <h3>Beschreibung:</h3>


{/*         Aktuell zum debuggen als Kommentar noch drin.

            UID: {instance && instance.instanceMetaData.uid}<br></br>
            Hue: {instance && instance.instanceMetaData.hue}<br></br>
            Brightness: {instance && instance.instanceMetaData.brightness}<br></br>
            Saturation: {instance && instance.instanceMetaData.saturation}<br></br>
            Coverage: {instance && instance.instanceMetaData.coverage}<br></br><br></br>*/}

            {instance && instance.MainDicomTags.ImageComments}
            <h3>Angeheftete Tags:</h3>
            {<div>{tags}</div>}
        </InstancePaper>
    );
};