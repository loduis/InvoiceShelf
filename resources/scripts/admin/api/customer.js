import Resource, { get, post } from '@/scripts/admin/api/request'

export default class Customer extends Resource {
  static get path () {
    return 'customers'
  }

  static stats (params) {
    return get(`${this.path}/${params.id}`, params)
  }

  static delete (...ids) {
    return post(`${this.path}/delete`, {
      ids
    })
  }
}
