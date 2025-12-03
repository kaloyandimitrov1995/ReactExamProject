import * as api from './api.js';

const baseUrl = '/data/profiles';

export const getMyProfile = async (userId) => {
  const query = encodeURIComponent(`_ownerId="${userId}"`);
  const result = await api.get(`${baseUrl}?where=${query}`);
  return result[0];
};

export const getByUserId = async (userId) => {
  const query = encodeURIComponent(`_ownerId="${userId}"`);
  const result = await api.get(`${baseUrl}?where=${query}`);
  return result[0];
};

export const create = (profileData) => api.post(baseUrl, profileData);

export const update = (id, profileData) => api.put(`${baseUrl}/${id}`, profileData);
