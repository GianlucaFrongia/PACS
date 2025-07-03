import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { showInfoToast } from "../base/Toasts.tsx";

interface DeleteDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteDialog = ({ open, onClose, onConfirm }: DeleteDialogProps) => {
    const handleClose = () => {
        showInfoToast("Löschen des Tags abgebrochen");
        onClose();
    };

    const handleDelete = () => {
        onConfirm();
    };

    return (
        <Dialog id={"delete-dialog"} open={open} onClose={handleClose} aria-labelledby="delete-dialog-title" aria-describedby="delete-dialog-description">
            <DialogTitle id="delete-dialog-title">Tag löschen</DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description">Sind Sie sicher, dass Sie diesen Tag löschen möchten?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Abbrechen</Button>
                <Button onClick={handleDelete} autoFocus>Löschen</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteDialog;