import Resource, { post, get } from '@/scripts/admin/api/request'
import { nextNumber } from '@/scripts/admin/api/helpers'

export default class Estimate extends Resource {
  static get path () {
    return 'estimates'
  }

  static nextNumber (params) {
    return nextNumber('estimate', params)
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

  static changeStatus (data) {
    return this.#post(`${data.id}/status`, data)
  }

  static convertToInvoice (id) {
    return this.#post(`${id}/status`)
  }

  static templates (params) {
    return this.#get('templates', params)
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
