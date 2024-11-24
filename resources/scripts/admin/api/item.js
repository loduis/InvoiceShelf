import Resource, { post } from '@/scripts/admin/api/request'

export default class Item extends Resource {
  static get path () {
    return 'items'
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
