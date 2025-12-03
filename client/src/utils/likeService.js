import * as api from './api.js';

const baseUrl = "/data/likes";
export const getLikesByTopic = async (topicId) => {
  const query = encodeURIComponent(`topicId="${topicId}"`);
  return api.get(`${baseUrl}?where=${query}`);
};

export const userLiked = async (topicId, userId) => {
  const query = encodeURIComponent(`topicId="${topicId}" AND _ownerId="${userId}"`);
  const result = await api.get(`${baseUrl}?where=${query}`);
  return result[0]; 
};

export const like = (data) => api.post(baseUrl, data);
export const unlike = (id) => api.del(`${baseUrl}/${id}`);
