import Resource, { get, post } from '@/scripts/admin/api/request'
import { nextNumber } from './helpers'

export default class Payment extends Resource {
  static get path () {
    return 'payments'
  }

  static nextNumber (params) {
    return nextNumber('payment', params)
  }

  static send (data) {
    return this.#post(`${data.id}/send`, data)
  }

  static preview (params) {
    return this.#get(`${params.id}/send/preview`, params)
  }

  static clone (data) {
    return this.#post(`${data.id}/clone`, data)
  }

  static delete (...ids) {
    const params = ids.length === 1
      ? ids[0]
      : {
          ids
        }
    return this.#post('delete', params)
  }

  static #get (path, params) {
    return get(`${this.path}/${path}`, params)
  }

  static #post (path, params) {
    return post(`${this.path}/${path}`, params)
  }
}
