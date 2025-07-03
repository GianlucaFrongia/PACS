import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import {ChangeEvent, useState} from "react";
import {commentService} from "./CommentService.js";
import {Instance} from "../types/instance.ts";
import {AuthContext} from "../context/AuthContextProvider.tsx";
import {useContext} from "react";
import {dataService} from "../dashboard/DataService.ts";
import {showErrorToast, showSuccessToast} from "../base/Toasts.tsx";

interface Props{
    instance: Instance,
    setComments: (comments: () => never[]) => void
}
export const CommentForm = ({instance, setComments}: Props) => {

    const authContext = useContext(AuthContext);
    const [commentValue, setCommentValue] = useState<string>("");
    const handleSendClick = () => {

        if (commentValue.trim() !== "") {
            commentService.save(instance.instanceMetaData.uid, authContext.username, commentValue)
                .then(() => {
                    // @ts-ignore
                    dataService.findByUid(instance.instanceMetaData.uid).then(response => {
                        if (response.data.instanceMetaData.comments) {
                            setComments(response.data.instanceMetaData.comments);
                        }
                    });
                });
            showSuccessToast("Kommentar erfolgreich erfasst");
            setCommentValue("");
        }else{
            showErrorToast("Geben Sie einen Kommentar ein. Leere Kommentare sind nicht erlaubt.");
        }

    };

    const handleCommentChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCommentValue(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendClick();
        }
    };

    return (
        <>
            <div style={{ marginBottom: '10px' }} className="commentField">
                <TextField
                    id="outlined-multiline-static"
                    label="Kommentar verfassen"
                    multiline
                    rows={3}
                    value={commentValue}
                    onChange={handleCommentChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <div className="commentButton">
                <Button
                    variant="contained"
                    endIcon={<SendIcon/>}
                    onClick={handleSendClick}>
                    Senden
                </Button>
            </div>
        </>
    )
}
