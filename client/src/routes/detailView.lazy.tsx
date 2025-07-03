import {createLazyFileRoute} from '@tanstack/react-router';
import {DetailViewComments} from "../detailview/DetailViewComments.tsx";
import {DetailViewImage} from "../detailview/DetailViewImage.tsx";
import '../detailview/DetailView.css'
import {DetailViewColorAnalysis} from "../detailview/DetailViewColorAnalysis.tsx";
import {DetailViewBackButton} from "../detailview/DetailViewBackButton.tsx";
import {DetailViewTags} from "../detailview/DetailViewTags.tsx";
import {DetailViewDescription} from "../detailview/DetailViewDescription.tsx";
import {useEffect, useState} from "react";
import {Instance} from "../types/instance";
import {dataService} from "../dashboard/DataService";
import {FooterComponent} from "../base/FooterComponent.tsx";
import {ToastContainer} from "react-toastify";
import {useTheme} from "../context/ThemeContext.tsx";

export const Route = createLazyFileRoute('/detailView')({
    component: DetailViewLazy,
})

function DetailViewLazy()  {

    const {uid} = Route.useSearch() as {uid: string }
    const [instance, setInstance] = useState<Instance>();
    const {themeType} = useTheme();
    const urlUIDparsed = parseInt(uid.substring(uid.lastIndexOf('.')+1))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dataService.findByUid(urlUIDparsed);
                if(result){
                    setInstance(result.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, []);

    if(!instance) return (<div>Loading...</div>)

    return (
        <>
            <div className="mainContainer">
                <div><DetailViewImage instance={instance}/></div>

                <div className="right" style={{backgroundColor: themeType === 'dark' ? '#333' : '#f7f6f6'}}>
                    <DetailViewBackButton/>
                    <div className="description"><DetailViewDescription instance={instance as Instance}/></div><br/>
                    <div className="colorAnalysis"><DetailViewColorAnalysis instance={instance as Instance}/></div><br/>
                    <div className="tags"><DetailViewTags instance={instance as Instance} /></div><br></br>
                    <div className="comments"><DetailViewComments instance={instance as Instance}/></div><br></br>
                    <FooterComponent componentEnabled={false}/>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}
