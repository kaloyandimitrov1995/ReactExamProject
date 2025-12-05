import * as api from "./api.js";

export async function usernameExists(username) {
  const query = encodeURIComponent(`username="${username}"`);
  const result = await api.get(`/users?where=${query}`);
  return result.length > 0;
}
