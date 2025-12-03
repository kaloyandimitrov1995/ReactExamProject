const BASE_URL = 'http://localhost:3030';

function getToken() {
  try {
    const raw = localStorage.getItem('auth');
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data.accessToken;
  } catch {
    return null;
  }
}

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  const token = getToken();
  if (token) {
    options.headers['X-Authorization'] = token;
  }

  if (data !== undefined) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const response = await fetch(BASE_URL + url, options);

  if (response.status === 204) {
    return {};
  }

  let result;
  try {
    result = await response.json();
  } catch (err) {
    if (response.ok) {
      return {};
    }
    throw err;
  }

  if (!response.ok) {
    const message = result.message || 'Request failed';
    throw new Error(message);
  }

  return result;
}

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const del = request.bind(null, 'DELETE');
