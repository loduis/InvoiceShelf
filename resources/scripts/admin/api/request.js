import { get, post, put, del, csrfToken } from '@/scripts/services/api'

export { csrfToken, get, post }

export default class Resource {
  static get path () {
    throw new Error('Define resource')
  }

  static all (params = {}) {
    return get(this.path, params)
  }

  static get (id, params) {
    return get(`${this.path}/${id}`, params)
  }

  static create (data) {
    return post(this.path, data)
  }

  static update (data) {
    let path = this.path
    if (Object.hasOwn(data, 'id')) {
      path += `/${data.id}`
    }
    return put(path, data)
  }

  static save (data) {
    return Object.hasOwn(data, 'id')
      ? this.update(data)
      : this.create(data)
  }

  static delete (id, params) {
    return del(`${this.path}/${id}`, params)
  }
}
