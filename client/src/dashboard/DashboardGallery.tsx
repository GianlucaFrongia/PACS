import { useContext, useEffect, useState, memo } from "react";
import { Context, LoadContext } from "./Context.tsx";
import { HoverPaper } from "./HoverPaper.tsx";
import { dataService } from "./DataService.js";
import { Grid } from '@mui/material';
import { Instance } from "../types/instance.ts";
import { useNavigate } from '@tanstack/react-router';
import './Dashboard.css'

interface Props {
    searchString: string;
    selectedTags: string[];
    logicalOp: boolean;
    sortValue: string;
}

export const DashboardGallery = memo(({ searchString, selectedTags, logicalOp, sortValue }: Props) => {
    const [data, setData] = useState<Instance[]>([]);
    const [filteredData, setFilteredData] = useState<Instance[]>([]);
    const navigate = useNavigate();
    const { size } = useContext(Context);
    const { setLoadImage } = useContext(LoadContext);
    const [showHoverPaper, setShowHoverPaper] = useState(false);
    const [hoverPaperInstance, setHoverPaperInstance] = useState<Instance | null>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dataService.findAll();
                if (result) {
                    setData(result.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const filterAndSortData = () => {
        const filtered = data.filter(item => {
            const matchesSearchString = item.MainDicomTags.ImageComments.toLowerCase().includes(searchString.toLowerCase());
            let matchesSelectedTags;
            if (logicalOp) {
                matchesSelectedTags = selectedTags.length === 0 || selectedTags.every(tag => (item.instanceMetaData?.tags || []).map(instanceTag => instanceTag.id.toString()).includes(tag));
            } else {
                matchesSelectedTags = selectedTags.length === 0 || (item.instanceMetaData?.tags || []).some(tag => selectedTags.includes(tag.id.toString()));
            }
            return matchesSearchString && matchesSelectedTags;
        }).sort((a, b) => {
            const aValue = a.instanceMetaData[sortValue as keyof Instance['instanceMetaData']];
            const bValue = b.instanceMetaData[sortValue as keyof Instance['instanceMetaData']];
            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return 1;
            if (bValue == null) return -1;
            return Number(aValue) - Number(bValue);
        });

        setFilteredData(filtered);
        setLoadImage(filtered.length);  // Update the image load count
    };

    useEffect(() => {
        filterAndSortData();
    }, [searchString, selectedTags, logicalOp, sortValue, data]); // Re-run when dependencies change

    const handleMouseOver = (instance: Instance) => {
        setHoverPaperInstance(instance);
        setShowHoverPaper(true);
    };

    const handleMouseOut = () => {
        setShowHoverPaper(false);
    };

    const calculateGridSize = () => {
        return 12 / (Math.max(3, Math.min(40, 41 - size)));
    };

    return (
        <div className="gallery">
            {showHoverPaper && hoverPaperInstance && <HoverPaper instance={hoverPaperInstance} />}
            <Grid id={"galleryList"} container spacing={0.4}>
                {filteredData.map((item) => (
                    <Grid style={{display: 'flex', justifyContent: "center"}} item key={item.ID} xs={calculateGridSize()} sm={calculateGridSize()} md={calculateGridSize()} lg={calculateGridSize()}>
                        <img style={{maxWidth: '100%', height: 'auto', objectFit: 'contain'}}
                             src={`${import.meta.env.VITE_ORTHANC_URL}/instances/${item.ID}/preview?quality=5`}
                             alt={item.MainDicomTags.ImageComments}
                             onMouseOver={() => handleMouseOver(item)}
                             onMouseOut={handleMouseOut}
                             onClick={() => navigate({
                                 to: '/detailView',
                                 search: {uid: item.MainDicomTags.SOPInstanceUID}
                             })}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
});
