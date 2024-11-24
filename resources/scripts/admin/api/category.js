import Resource from '@/scripts/admin/api/request'

export default class Category extends Resource {
  static get path () {
    return 'categories'
  }
}
