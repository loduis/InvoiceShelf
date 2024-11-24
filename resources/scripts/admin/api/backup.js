import Resource from '@/scripts/admin/api/request'

export default class Backup extends Resource {
  static get path () {
    return 'backups'
  }
}
