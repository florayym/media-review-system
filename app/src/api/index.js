/**
 * axios is a promise-based the asynchronous code. 
 * It’s the most popular promise based HTTP.
 */
import axios from 'axios'


/** TODO What is the baseURL? To server or to app? */
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertMedia = payload => api.post(`/media`, payload)
export const getAllMedias = () => api.get(`/medias`)
export const updateMediaById = (id, payload) => api.put(`/media/${id}`, payload)
export const deleteMediaById = id => api.delete(`/media/${id}`)
export const getMediaById = id => api.get(`/media/${id}`)

//export const login = () => api.get(`/login`)

const apis = {
    insertMedia,
    getAllMedias,
    updateMediaById,
    deleteMediaById,
    getMediaById,

    
}

// login,

export default apis