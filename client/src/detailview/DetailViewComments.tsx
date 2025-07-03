import './DetailView.css'
import {CommentList} from "./CommentList";
import {CommentForm} from "./CommentForm";
import {Instance} from "../types/instance";
import { useState, useEffect } from 'react';
import {Comment} from "../types/comment.ts";

interface Props{
    instance: Instance
}
export const DetailViewComments = ({ instance }: Props) => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            if (instance.instanceMetaData.comments) {
                setComments(instance.instanceMetaData.comments);
            }
        };
        fetchComments();
    }, [instance]);

    return (
        <div className="commentContainer">
            <div className="list"><CommentList comments={comments} setComments={setComments} instance={instance}/></div>
            <div className="submit"><CommentForm setComments={setComments} instance={instance}/></div>
        </div>
    )
}
