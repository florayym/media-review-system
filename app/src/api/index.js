/**
 * axios is a promise-based the asynchronous code. 
 * It’s the most popular promise based HTTP.
 */
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertMedia = payload => api.post(`/media`, payload)
export const getAllMedias = () => api.get(`/medias`)
export const updateMediaById = (id, payload) => api.put(`/media/${id}`, payload)
export const deleteMediaById = id => api.delete(`/media/${id}`)
export const getMediaById = id => api.get(`/media/${id}`)

const apis = {
    insertMedia,
    getAllMedias,
    updateMediaById,
    deleteMediaById,
    getMediaById,
}

export default apis