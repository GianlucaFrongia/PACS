import axios from 'axios'
import storage from "../utils/storage";

export const tagService = {
    findAll,
    findById,
    save,
    update,
    remove,
}

async function findAll () {
    try {
        return await instance.get('/tags');
    } catch(error) {
        console.error(error);
    }
}

function findById (id) {
    return instance.get(`/tags/${id}`);
}

function save (namespace) {
    return  instance.post('/tags', {namespace});
}

function update (id, namespace) {
    return instance.put(`/tags/${id}`, {namespace});
}

function remove (id) {
    return  instance.delete(`/tags/${id}`)
}

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    headers: {
        'Authorization': `Bearer ${storage.getToken()}`,
        'Content-Type': 'application/json',
    }
})