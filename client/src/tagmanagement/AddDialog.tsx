import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField } from '@mui/material';
import { showInfoToast } from "../base/Toasts.tsx";

interface AddDialogProps {
    open: boolean;
    onClose: () => void;
    onAgree: (arg: string) => void;
}

const AddDialog = ({ open, onClose, onAgree }: AddDialogProps) => {
    const [newTag, setNewTag] = useState("");

    const handleClose = () => {
        onClose();
        showInfoToast("Tagerstellung abgebrochen");
        setNewTag("");
    };

    const handleAdd = () => {
        onAgree(newTag);
        setNewTag("");
    };

    return (
        <Dialog id={"add-dialog"} open={open} onClose={handleClose}>
            <DialogTitle>Hinzufügen</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Geben Sie in der unteren Zeile den neuen Tag ein.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="adding"
                    label="Tagname"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleAdd();
                        }
                    }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Abbrechen</Button>
                <Button onClick={handleAdd}>Erstellen</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddDialog;