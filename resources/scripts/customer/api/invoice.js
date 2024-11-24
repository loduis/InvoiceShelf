import Resource from '@/scripts/customer/api/request'

export default class Invoice extends Resource {
  static get path () {
    return 'invoices'
  }
}
