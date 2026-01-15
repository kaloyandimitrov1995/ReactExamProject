const BASE_URL = "/api";

function getToken() {
  try {
    const raw = localStorage.getItem("auth");
    if (!raw) return null;
    const data = JSON.parse(raw);
    return data.accessToken;
  } catch {
    return null;
  }
}

async function request(method, url, data) {
  const token = getToken();  

  const options = {
    method,
    headers: {},
  };
  if (token) {
    options.headers["X-Authorization"] = token;
  }

  if (data !== undefined) {
    options.headers["Content-Type"] = "application/json";
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
    if (response.ok) return {};
    throw err;
  }

  if (!response.ok) {
    throw new Error(result.message || "Request failed");
  }

  return result;
}

export const get = (url) => request("GET", url);
export const post = (url, data) => request("POST", url, data);
export const put = (url, data) => request("PUT", url, data);
export const del = (url) => request("DELETE", url);
