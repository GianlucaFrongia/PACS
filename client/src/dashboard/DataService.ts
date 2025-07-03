import axios from "axios";
import storage from "../utils/storage.ts";

const username = 'orthanc';
const password = 'orthanc';

const headers = new Headers();
headers.append('Authorization', 'Basic ' + btoa(username + ':' + password)); // Encode credentials as base64

export const dataService = {
    findAll,
    findByUid,
    findPreview,
}

async function findAll() {
    try {
        const response = await api_instance.get('/instances');
        return response;
    } catch (error) {
        console.error(error);
    }
}

function findByUid(uid: number) {
    if (uid){
        return api_instance.get(`/instances/${uid}`);
    }
}

const api_instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    headers: {
        'Authorization': `Bearer ${storage.getToken()}`,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    }
})

const orthanc_instance = axios.create({
    baseURL: `${import.meta.env.VITE_ORTHANC_URL}/`,
    headers: {
        'Authorization': `Bearer ${storage.getToken()}`,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    }
})

function findPreview(id: string) {
    return orthanc_instance.get(`/instances/${id}/preview`, { responseType: 'blob' });
}
