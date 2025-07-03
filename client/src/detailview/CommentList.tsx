import {Instance} from "../types/instance.ts";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import {memo, useEffect} from 'react';
import {commentService} from "./CommentService.js";
import {Comment} from "../types/comment.ts"; // Import useState for component state management
import Stack from '@mui/material/Stack';
import { showWarningToast, showErrorToast } from "../base/Toasts.tsx";

interface Props {
    instance: Instance,
    comments: Comment[],
    setComments: (comments: Comment[]) => void
}

export const CommentList = memo(({instance, comments, setComments}: Props) => {
    useEffect(() => {
        if (instance.instanceMetaData) {
            setComments(instance.instanceMetaData.comments || []);
        }
    }, []);

    if (!comments.length) {
        return <div style={{marginBottom: '10px'}}>Keine Kommentare vorhanden.</div>;
    }

    const handleDelete = async (id: number) => {
        try {
            await commentService.remove(instance.instanceMetaData.uid, id);
            const updatedComments = comments.filter(comment => comment.id !== id);
            showWarningToast("Kommentar erfolgreich gelöscht");
            setComments(updatedComments);
        } catch (error) {
            const errorCommentDelete = "Fehler beim Löschen des Kommentars";
            showErrorToast(errorCommentDelete)
            console.error(errorCommentDelete, error);
        }
    };

    return (
        <div style={{maxHeight: '24vh', overflowY: 'auto', marginBottom: '10px'}}>
            <Stack spacing={1} style={{marginRight: '10px'}}>
                {comments.sort((a, b) => a.id - b.id).map(comment =>
                    <Card key={comment.id} sx={{"--Card-padding": "26px"}}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                    {comment.author?.slice(0, 2)}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="delete" onClick={() => handleDelete(comment.id)}>
                                    <DeleteIcon/>
                                </IconButton>
                            }
                            title={comment.author}
                            subheader={
                                new Date(comment.createdAt).toLocaleDateString('de-DE', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }) + ' - ' +
                                new Date(comment.createdAt).toLocaleTimeString('de-DE', {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })
                            }
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {comment.comment}
                            </Typography>
                        </CardContent>
                    </Card>
                )}
            </Stack>
        </div>
    );
})
