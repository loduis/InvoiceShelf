import Resource from '@/scripts/admin/api/request'

export default class Unit extends Resource {
  static get path () {
    return 'units'
  }
}
