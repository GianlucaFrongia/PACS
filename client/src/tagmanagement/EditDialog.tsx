import {useEffect, useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';
import { showInfoToast } from "../base/Toasts.tsx";

interface EditDialogProps {
    open: boolean;
    onClose: () => void;
    onAgree: (arg: string) => void;
    oldTagName: string;
}

const EditDialog = ({open, onClose, onAgree, oldTagName}: EditDialogProps) => {
    const [editedTagName, setEditedTagName] = useState("");

    useEffect(() => {
        setEditedTagName(oldTagName);
    }, [oldTagName, open]);

    const handleClose = () => {
        onClose();
        showInfoToast("Bearbeiten des Tags abgebrochen")
        setEditedTagName("");
    };

    const handleEdit = () => {
        onAgree(editedTagName);
    }

    return (
        <Dialog id={"edit-dialog"} open={open} onClose={handleClose}>
            <DialogTitle>Editieren</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Geben Sie in der unteren Zeile den neuen Tagnamen ein.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="editieren"
                    label="Tagname"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={editedTagName}
                    onChange={(e) => setEditedTagName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleEdit();
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Abbrechen</Button>
                <Button onClick={handleEdit}>Umbenennen</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDialog;