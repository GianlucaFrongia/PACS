import { toast, Bounce } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const showSuccessToast = (message: string) => {
    toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
    });
};

export const showInfoToast = (message: string) => {
    toast.info(message, {
        position:  'top-right',
        autoClose:  5000,
        hideProgressBar:  false,
        closeOnClick:  true,
        pauseOnHover:  true,
        draggable:  true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
    });
};

export const showWarningToast = (message: string) => {
    toast.warn(message, {
        position:  'top-right',
        autoClose:  5000,
        hideProgressBar:  false,
        closeOnClick:  true,
        pauseOnHover:  true,
        draggable:  true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
    });
};

export const showErrorToast = (message: string) => {
    toast.error(message, {
        position:  'top-right',
        autoClose:  5000,
        hideProgressBar:  false,
        closeOnClick:  true,
        pauseOnHover:  true,
        draggable:  true,
        progress: undefined,
        theme: "colored",
        transition: Bounce
    });
};