import { get, post } from './request'

export default {
  bootstrap () {
    return get('bootstrap')
  },
  dashboard (params) {
    return get('dashboard', params)
  },
  settings (data) {
    return post('settings', data)
  }
}
