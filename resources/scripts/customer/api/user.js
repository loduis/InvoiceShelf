import Resource from '@/scripts/customer/api/request'

export default class User extends Resource {
  static get (companySlug) {
    return this._get(companySlug, 'me')
  }

  static dashboard (companySlug) {
    return this._get(companySlug, 'dashboard')
  }

  static bootstrap (companySlug) {
    return this._get(companySlug, 'bootstrap')
  }

  static countries (companySlug) {
    return this._get(companySlug, 'countries')
  }

  static update (companySlug, data) {
    return this._post(companySlug, 'profile', data)
  }
}
