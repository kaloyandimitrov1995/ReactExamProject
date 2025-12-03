import * as api from './api.js';

const baseUrl = '/data/topics';

export const getAll = () => api.get(baseUrl);

export const getById = (id) => api.get(`${baseUrl}/${id}`);

export const create = (topicData) => api.post(baseUrl, topicData);

export const update = (id, topicData) => api.put(`${baseUrl}/${id}`, topicData);

export const remove = (id) => api.del(`${baseUrl}/${id}`);
