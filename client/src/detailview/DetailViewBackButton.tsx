import {useNavigate} from '@tanstack/react-router';
import './DetailView.css'
import '../detailview/DetailView.css'
import {IconButton} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

export const DetailViewBackButton = () => {

    const navigate = useNavigate()

    return (
        <div style={{textAlign: 'right'}}>
            <IconButton id={"backButton"} size="large"
                        onClick={() =>
                            navigate({
                                to: '/',
                            })
                        }>
                <CancelIcon/>
            </IconButton>
        </div>
    )
}