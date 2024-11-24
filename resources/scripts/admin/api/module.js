import Resource, { get, post } from '@/scripts/admin/api/request'

export default class Module extends Resource {
  static get path () {
    return 'modules'
  }

  static checkApiToken (value) {
    return this.#get('check', {
      api_token: value
    })
  }

  static disable (id) {
    return this.#post(`${id}/disable`)
  }

  static enable (id) {
    return this.#post(`${id}/enable`)
  }

  static delete () {
    throw new Error('Invalid method')
  }

  static update () {
    throw new Error('Invalid method')
  }

  static #get (path, params) {
    return get(`${this.path}/${path}`, params)
  }

  static #post (path, params) {
    return post(`${this.path}/${path}`, params)
  }
}
