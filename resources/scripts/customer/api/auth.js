import Resource, { csrfToken } from '@/scripts/customer/api/request'

export default class Auth extends Resource {
  static async login (companySlug, data) {
    await csrfToken()
    return this._post(companySlug, 'login', data)
  }

  static forgotPassword (companySlug, data) {
    return this._post(companySlug, 'auth/password/email', data)
  }

  static resetPassword (companySlug, data) {
    return this._post(companySlug, 'auth/reset/password', data)
  }

  static logout (companySlug) {
    return this._post(companySlug, 'logout')
  }
}
