import Resource from '@/scripts/admin/api/request'

export default class TaxType extends Resource {
  static get path () {
    return 'tax-types'
  }

  /** @todo .post('/api/m/sales-tax-us/current-tax', data) */
}
