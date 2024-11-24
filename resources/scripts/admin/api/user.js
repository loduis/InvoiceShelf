import Resource, { get, post } from '@/scripts/admin/api/request'

export default class User extends Resource {
  static get path () {
    return 'users'
  }

  static search (params) {
    return get('search/user', params)
  }

  static delete (...ids) {
    const params = ids.length === 1
      ? ids[0]
      : {
          ids
        }
    return this.#post('delete', params)
  }

  static #post (path, params) {
    return post(`${this.path}/${path}`, params)
  }
}
