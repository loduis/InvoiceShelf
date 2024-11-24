import Resource, { get, post } from '@/scripts/admin/api/request'

export default class CurrentCompany extends Resource {
  static get path () {
    return 'company'
  }

  static mailConfig () {
    return get(`${this.path}/mail/config`)
  }

  static get (params) {
    return get('current-company', params)
  }

  static settings (paramsOrData, isData = false) {
    return (isData ? post : get)(`${this.path}/settings`, paramsOrData)
  }

  static uploadLogo (data) {
    return post(`${this}/upload-logo`, data)
  }
}
