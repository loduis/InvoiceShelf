import Resource from '@/scripts/admin/api/request'

export default class CustomField extends Resource {
  static get path () {
    return 'custom-fields'
  }
}
