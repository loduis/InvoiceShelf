import { post, csrfToken, get } from './request'

export default class Auth {
  static async login (data) {
    await csrfToken()
    return post('login', data)
  }

  static logout () {
    return post('logout')
  }

  static check () {
    return get('auth/check')
  }
}
