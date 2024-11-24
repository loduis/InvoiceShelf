import Resource, { post } from '@/scripts/admin/api/request'

export default class Company extends Resource {
  static get path () {
    return 'companies'
  }

  static delete (data) {
    return post(`${this.path}/delete`, data)
  }
}
