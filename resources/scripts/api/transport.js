import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  'Accept': 'application/json',
  'Content-Type': "application/json",
}

function resolvePath(path) {
  if (path.startsWith('/')) {
    return path;
  }
  return '/api/v1/' + path;
}

export async function get(path, params) {
  return axios({
    method: 'GET',
    url: resolvePath(path),
    params,
  });
}

export async function post(path, data) {
  return axios({
    method: 'POST',
    url: resolvePath(path),
    data,
  });
}

export async function put(path, data) {
  return axios({
    method: 'PUT',
    url: resolvePath(path),
    data,
  });
}

export async function patch(path, data) {
  return axios({
    method: 'PATCH',
    url: resolvePath(path),
    data,
  });
}

export async function del(path, params) {
  return axios({
    method: 'DELETE',
    url: resolvePath(path),
    params,
  });
}