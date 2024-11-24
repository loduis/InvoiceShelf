import Resource, { get } from '@/scripts/admin/api/request'

export default class Disk extends Resource {
  static get path () {
    return 'disks'
  }

  static drivers () {
    return get(`${this.path}/drivers`)
  }
}
