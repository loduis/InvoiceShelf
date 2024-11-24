import { get, post, csrfToken } from '@/scripts/services/api'

export { csrfToken }

export default class Resource {
  static get path () {
    return ''
  }

  static all (companySlug, params) {
    return this._get(companySlug, this.path, params)
  }

  static get (companySlug, id, params) {
    return this._get(companySlug, id, params)
  }

  static _get (companySlug, path, params) {
    return get(this._resolve(companySlug, path), params)
  }

  static _post (companySlug, path, data) {
    return post(this._resolve(companySlug, path), data)
  }

  static _resolve (companySlug, path) {
    if (path !== '') {
      path = `${this.path}/${path}`
    }
    return `${companySlug}/customer/${path}`
  }
}
