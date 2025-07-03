import {Tag} from "./tag.ts";
import {Comment} from "./comment.ts";

export interface Instance {
    FileSize: number,
    FileUuid: string,
    ID: string,
    IndexInSeries: number,
    Labels: [],
    MainDicomTags: {
        ImageComments: string;
        InstanceNumber: string;
        SOPInstanceUID: string;
    },
    ParentSeries: string,
    Type: string,
    uid: number,
    instanceMetaData: {
        src: string;
        originalURL: string;
        magnification: number;
        uid: number;
        hue: number;
        saturation: number;
        brightness: number;
        coverage: number;
        tags: Tag[];
        comments: Comment[];
    },
    instance: Instance | undefined
}