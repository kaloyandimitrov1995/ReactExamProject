import * as api from './api.js';

const baseUrl = '/data/comments';

export const getByTopic = async (topicId) => {
  const query = encodeURIComponent(`topicId="${topicId}"`);
  return api.get(`${baseUrl}?where=${query}`);
};

export const create = (commentData) => api.post(baseUrl, commentData);
