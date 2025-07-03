import axios from "axios";

export const commentService = {
    findAll,
    save,
    remove,
}

async function findAll () {
    try {
        const response = await instance.get('/api/comments');
        return response;
    } catch(error) {
        console.error(error);
    }
}

function save (uid, author, comment) {
    return  instance.post(`/instances_metadata/${uid}/comments/`, {comment, author});
}

function remove (uid, id) {
    return  instance.delete(`/instances_metadata/${uid}/comments/${id}`)
}

const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    headers: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    }
})

instance.interceptors.response.use(response => {
    return response
}, function (error) {
    if (error.response) {
        return { status: error.response.status }
    }
    if (error.request) {
        return { error: error.request }
    }
    return { error: error.message }
})
