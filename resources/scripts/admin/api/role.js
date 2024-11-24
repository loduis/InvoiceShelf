import Resource, { get } from '@/scripts/admin/api/request'

export default class Role extends Resource {
  static get path () {
    return 'roles'
  }

  static abilities () {
    return get('abilities')
  }
}
