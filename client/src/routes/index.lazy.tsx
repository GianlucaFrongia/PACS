import { createLazyFileRoute } from '@tanstack/react-router';
import { DashboardSearch } from "../dashboard/DashboardSearch";
import { DashboardGallery } from "../dashboard/DashboardGallery";
import { useState } from "react";
import { FooterComponent } from "../base/FooterComponent";
import { ToastContainer } from "react-toastify";

export const Route = createLazyFileRoute('/')({
    component: IndexLazy,
});

function IndexLazy() {
    const [searchString, setSearchString] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [logicalOp, setLogicalOp] = useState(false);
    const [sortValue, setSortValue] = useState('uid');

    const searchHandler = ({ search, tags, logicalOp, sortValue}: { search: string; tags: string[]; logicalOp: boolean, sortValue: string }) => {
        setSearchString(search);
        setSelectedTags(tags);
        setLogicalOp(logicalOp); // Aktualisiert den Zustand basierend auf dem Such-Handler
        setSortValue(sortValue)
    }

    return (
        <>
            <ToastContainer />
            <DashboardSearch onSearch={searchHandler} />
            <div style={{minHeight: 'calc(100vh - 150px)'}}>
                <DashboardGallery searchString={searchString} selectedTags={selectedTags} logicalOp={logicalOp} sortValue={sortValue} />
            </div>
            <FooterComponent componentEnabled={true} />
        </>
    );
}
