import {createLazyFileRoute } from '@tanstack/react-router';
import {FooterComponent} from "../base/FooterComponent.tsx";
import TagManagement from "../tagmanagement/TagManagement.tsx";

export const Route = createLazyFileRoute('/tagManagement')({
    component: TagManagementLazy,
})

function TagManagementLazy() {

    return (
        <>
            <div style={{ minHeight:'100vh' }}>
                <TagManagement/>
                <FooterComponent componentEnabled={false}/>
            </div>
        </>
    )
}
