/**
 * axios is a promise-based the asynchronous code. 
 * It’s the most popular promise based HTTP.
 */
import axios from 'axios'

// ! Does the baseURL refers to server?
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
})

export const uploadMedia = (payload, config) => api.post(`/media/`, payload, config);
export const getAllMedia = () => api.get(`/media/`);
export const getMediaById = id => api.get(`/media/${id}`);
export const updateMediaById = (id, payload) => api.put(`/media/${id}`, payload);
export const deleteMediaById = id => api.delete(`/media/${id}`);

export const addReviewer = payload => api.post(`/reviewers/`, payload);
export const getAllReviewers = () => api.get('/reviewers/secure/');
export const getReviewerById = id => api.get(`/reviewers/secure/${id}`);
export const reviewerLogin = payload => api.post(`/reviewers/login`, payload);

export const getHistoryByMediaId = id => api.get(`/secure/history/media/${id}`);
export const getHistoryByReviewerId = id => api.get(`/secure/history/reviewer/${id}`);
export const getHistory = () => api.get(`/secure/history/all`);
export const addHistory = payload => api.get(`/secure/history/add`, payload);

const apis = {

  uploadMedia, // !
  getAllMedia,
  getMediaById,
  updateMediaById,
  deleteMediaById,

  reviewerLogin, // !
  getAllReviewers, // !
  getReviewerById,
  addReviewer,

  getHistoryByReviewerId, // !
  getHistoryByMediaId,
  getHistory,
  addHistory,
}

// login,

export default apis