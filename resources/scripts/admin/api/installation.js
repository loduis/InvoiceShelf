import { csrfToken, get, post, put } from './request'

export default class Installation {
  static get path () {
    return 'installation'
  }

  static languages () {
    return this.#get('languages')
  }

  static requirements () {
    return this.#get('requirements')
  }

  static step (data) {
    return this[data === undefined ? '#get' : '#post']('wizard-step', data)
  }

  static language (data) {
    return this.#post('wizard-language', data)
  }

  static permissions () {
    return this.#get('permissions')
  }

  static database (paramsOrData, set = false) {
    return this[set ? '#post' : '#get']('database/config', paramsOrData)
  }

  static domain (data) {
    return put(`${this.path}/set-domain`, data)
  }

  static finish () {
    return this.#post('finish')
  }

  static async login () {
    await csrfToken()
    return this.#post('login')
  }

  static #get (path, params) {
    return get(`${this.path}/${path}`, params)
  }

  static #post (path, params) {
    return post(`${this.path}/${path}`, params)
  }
}
