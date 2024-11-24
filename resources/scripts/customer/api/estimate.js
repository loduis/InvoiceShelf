import Resource from '@/scripts/customer/api/request'

export default class Estimate extends Resource {
  static get path () {
    return 'estimates'
  }

  static changeStatus (companySlug, id, status) {
    return this._post(companySlug, `${id}/status`, { status })
  }
}
