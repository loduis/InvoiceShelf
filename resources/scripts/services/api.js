import axios from 'axios'
import Ls from '@/scripts/services/ls.js'

window.Ls = Ls

axios.defaults.withCredentials = true
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest',
  Accept: 'application/json',
  'Content-Type': 'application/json'
}

axios.interceptors.request.use(function (config) {
  // Pass selected company to header on all requests
  const companyId = Ls.get('selectedCompany')

  const authToken = Ls.get('auth.token')

  if (authToken) {
    config.headers.common.Authorization = authToken
  }

  if (companyId) {
    config.headers.common.company = companyId
  }

  return config
})

function resolvePath (path) {
  return path.startsWith('/') ? path : '/api/v1/' + path
}

export async function csrfToken () {
  return get('/sanctum/csrf-cookie')
}

export async function get (path, params) {
  const res = await axios({
    method: 'GET',
    url: resolvePath(path),
    params
  })
  if (res.status !== 200) {
    throw new HttpError(res)
  }
  return res.data
}

export async function post (path, data) {
  return axios({
    method: 'POST',
    url: resolvePath(path),
    data
  })
}

export async function put (path, data) {
  return axios({
    method: 'PUT',
    url: resolvePath(path),
    data
  })
}

/* export async function patch (path, data) {
  return axios({
    method: 'PATCH',
    url: resolvePath(path),
    data
  })
}
*/

export async function del (path, params) {
  return axios({
    method: 'DELETE',
    url: resolvePath(path),
    params
  })
}

class HttpError extends Error {
  constructor (response) {
    super(`Request failed with status ${response.status}`)
    this.response = response
    this.status = response.status
    this.name = 'HttpError'
  }
}
