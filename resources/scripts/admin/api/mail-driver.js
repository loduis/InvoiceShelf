import { get, post } from '@/scripts/admin/api/request'

export default class MailDriver {
  static get path () {
    return 'mail/config'
  }

  static all () {
    return get('mail/drivers')
  }

  static config (data) {
    const path = 'mail/config'
    return data === undefined ? post(path, data) : get(path)
  }

  static test (data) {
    return post('mail/test', data)
  }
}
