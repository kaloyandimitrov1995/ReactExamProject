import * as api from './api.js';

const baseUrl = "/data/profileLikes";
export const getLikesForProfile = async (profileUserId) => {
  const query = encodeURIComponent(`profileUserId="${profileUserId}"`);
  return api.get(`${baseUrl}?where=${query}`);
};
export const userLikedProfile = async (profileUserId, userId) => {
  const query = encodeURIComponent(`profileUserId="${profileUserId}" AND _ownerId="${userId}"`);
  const result = await api.get(`${baseUrl}?where=${query}`);
  return result[0];
};
export const like = (data) => api.post(baseUrl, data);
export const unlike = (id) => api.del(`${baseUrl}/${id}`);
