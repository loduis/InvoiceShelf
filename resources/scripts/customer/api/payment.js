import Resource from '@/scripts/customer/api/request'

export default class Payment extends Resource {
  static get path () {
    return 'payments'
  }

  static methods (companySlug, params) {
    return this._get(companySlug, 'payment-method', params)
  }
}
