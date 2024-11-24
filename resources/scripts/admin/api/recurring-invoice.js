import Resource, { get, post } from './request'

export default class RecurringInvoice extends Resource {
  static get path () {
    return 'recurring-invoices'
  }

  static frequency (params) {
    return get('recurring-invoice-frequency', params)
  }

  /** @todo Need fixed for delete */
  static delete (...ids) {
    const params = ids.length === 1
      ? ids[0]
      : {
          ids
        }
    return this.#post('delete', params)
  }

  /** @todo Need fixed for put or patch */
  static update (data) {
    return this.#post(data.id, data)
  }

  static #post (path, params) {
    return post(`${this.path}/${path}`, params)
  }
}
