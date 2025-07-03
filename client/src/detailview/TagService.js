import axios from "axios";

export const tagService = {
    findAll,
    save,
    remove
}

async function findAll() {
    try {
        const response = await instance.get('/tags');
        return response;
    } catch (error) {
        console.error(error);
    }
}

function save (instance_id, tag_id) {
    return instance.post(`/instances_metadata/${instance_id}/tags/${tag_id}`)
}

function remove (instance_id, tag_id) {
    return instance.delete(`/instances_metadata/${instance_id}/tags/${tag_id}`)
}

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    }
})
