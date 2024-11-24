import Resource from '@/scripts/admin/api/request'

export default class PaymentMethod extends Resource {
  static get path () {
    return 'payment-methods'
  }
}
