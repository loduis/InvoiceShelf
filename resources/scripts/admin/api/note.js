import Resource from '@/scripts/admin/api/request'

export default class Payment extends Resource {
  static get path () {
    return 'payments'
  }
}
