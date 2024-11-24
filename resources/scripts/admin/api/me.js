import Resource, { get, post } from '@/scripts/admin/api/request'

export default class Me extends Resource {
  static get path () {
    return 'me'
  }

  static get () {
    return get(this.path)
  }

  static uploadAvatar (data) {
    return this.#post('upload-avatar', data)
  }

  static settings (paramsOrData, set = false) {
    return (set ? this.#post : this.#get)('settings', paramsOrData)
  }

  static #get (path, params) {
    return get(`${this.path}/${path}`, params)
  }

  static #post (path, data) {
    return post(`${this.path}/${path}`, data)
  }
}
