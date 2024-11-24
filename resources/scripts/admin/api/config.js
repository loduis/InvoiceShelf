import { get } from './request'

export default class Config {
  static all (params) {
    return get('config', params)
  }

  static get (key) {
    return this.all({ key })
  }

  static dateFormats () {
    return get('date/formats')
  }

  static timezones () {
    return get('timezones')
  }

  static countries () {
    return get('countries')
  }

  static numberPlaceHolders () {
    return get('number-placeholders')
  }
}
