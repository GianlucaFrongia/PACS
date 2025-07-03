import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowModel } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddDialog from './AddDialog';
import EditDialog from './EditDialog';
import DeleteDialog from './DeleteDialog';
import { tagService } from "./TagService";
import { ToastContainer } from "react-toastify";
import { showSuccessToast, showWarningToast, showErrorToast } from "../base/Toasts.tsx";

const TagManagement = () => {
    const [rows, setRows] = useState<GridRowModel[]>([]);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState<GridRowModel | null>(null);
    const [oldTagName, setOldTagName] = useState<string>("");

    useEffect(() => {
        loadTagsFromApi(setRows);
    }, []);

    const loadTagsFromApi = async (setRows: (rows: { id: number, namespace: string, used: number }[]) => void) => {
        try {
            const response = await tagService.findAll();

            if (response && response.data)  {
                const tags = response.data;
                const newRows = tags.map((tag: { id: number, namespace: string, instanceMetaDataIds: number[] }) => ({
                    id: tag.id,
                    namespace: tag.namespace,
                    used: !tag.instanceMetaDataIds || tag.instanceMetaDataIds.length === 0 ? 0 : tag.instanceMetaDataIds.length
                }));
                setRows(newRows);
            } else {
                const loadError = "Fehler beim Laden der Tags";
                showErrorToast(loadError);
                console.error(loadError);
            }
        } catch (error) {
            const loadAPIError = "Error beim Laden aus API";
            showErrorToast(loadAPIError);
            console.error(loadAPIError + ": ", error);
        }
    };

    useEffect(() => {
        loadTagsFromApi(setRows);
    }, []);

    const handleClickAdd = () => {
        setOpenAddDialog(true);
    }

    const handleClickEdit = (params: {row: GridRowModel}) => {
        setOpenEditDialog(true);
        setSelectedRow(params.row);
        setOldTagName(params.row.namespace);
    }

    const handleClickDelete = (params: { row: GridRowModel }) => {
        setSelectedRow(params.row);
        setOpenDeleteDialog(true);
    };

    const handleCloseAddDialog = () => {
        loadTagsFromApi(setRows);
        setOpenAddDialog(false);
    }

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setSelectedRow(null);
        setOldTagName("");
    }

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setSelectedRow(null);
    };

    const handleAdd = async (newTag: string) => {
        if (newTag.trim() !== "") {
            try {
                const response = await tagService.save(newTag);
                console.log('Tag erfolgreich erstellt: ', response.data);
                showSuccessToast("Tag erfolgreich erstellt");
                handleCloseAddDialog();
                return response.data;
            } catch (error) {
                const errorTagAdd = "Fehler beim erstellen des Tags";
                showErrorToast(errorTagAdd);
                console.error(errorTagAdd + ': ', error);
                throw error;

            }
        } else {
            showErrorToast("Geben Sie einen Tag ein. Leere Tags sind nicht erlaubt.");

        }
    };

    const handleEdit = async (editedTagName: string) => {
        try {
            if (selectedRow && selectedRow.id) {
                if (editedTagName.trim() !== "") {
                    await tagService.update(selectedRow.id, editedTagName);
                    loadTagsFromApi(setRows);
                    handleCloseEditDialog();
                    showSuccessToast("Tag wurde bearbeitet");
                } else {
                    await tagService.update(selectedRow.id, oldTagName);
                    loadTagsFromApi(setRows);
                    handleCloseEditDialog();
                    showErrorToast("Tag wurde nicht bearbeitet. Leere Tags sind nicht erlaubt.")
                }
            }
        } catch (error) {
            const errorTagEdit = "Fehler beim Bearbeiten des Tags";
            showErrorToast(errorTagEdit);
            console.error(errorTagEdit + ": ", error);
        }
    }

    const handleDelete = async () => {
        try {
            if (selectedRow && selectedRow.id) {
                await tagService.remove(selectedRow.id);
                const updatedRows = rows.filter(row => row.id !== selectedRow.id);
                setRows(updatedRows);
                handleCloseDeleteDialog();
                showWarningToast("Tag wurde gelöscht");
            }
        } catch (error) {
            const errorTagDelete = "Fehler beim löschen des Tags";
            showErrorToast(errorTagDelete);
            console.error(errorTagDelete + ": ", error);
        }
    };

    const columns: GridColDef[] = [
        { field: 'namespace', headerName: 'Tagname', width: 100, type: "string" },
        {field: 'used', headerName: 'Anzahl Verwendungen', type: "number", width:170},
        { field: "edit",
            headerName: "Bearbeiten",
            width: 140,
            sortable: false,
            renderCell: (params) => {
                const onClickEdit = () => {
                    handleClickEdit(params);
                }
                return <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    onClick={onClickEdit}
                >
                    Edit
                </Button>;
            },
        },
        { field: "delete",
            headerName: "Löschen",
            width: 140,
            sortable: false,
            renderCell: (params) => {
                const onClickDelete = () => {
                    handleClickDelete(params);
                };

                return <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={onClickDelete}
                >
                    Delete
                </Button>;
            },
        }
    ];

    return (
        <div style={{ width: '80%', margin: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div id='header' style={{ width: '100%', overflow: "hidden" }}>
                <h1 style={{ float: "left" }}>Tagverwaltung</h1>
                <ToastContainer />
                <Button
                    id='add'
                    variant='outlined'
                    startIcon={<AddBoxIcon />}
                    onClick={handleClickAdd}
                    style={{ float: "right", bottom: -50 }}
                >
                    Hinzufügen
                </Button>
            </div>
            <div style={{ flex: '1', overflow: 'auto' }}>
                <DataGrid rows={rows} columns={columns} />
                <AddDialog
                    open={openAddDialog}
                    onClose={handleCloseAddDialog}
                    onAgree={handleAdd}
                />
                <DeleteDialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                    onConfirm={handleDelete}
                />
                <EditDialog
                    open={openEditDialog}
                    onClose={handleCloseEditDialog}
                    onAgree={handleEdit}
                    oldTagName={oldTagName}
                />
            </div>
        </div>
    );
};

export default TagManagement;