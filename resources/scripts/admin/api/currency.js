import { get, post } from './request'
import Config from './config'

export default class Currency {
  static all () {
    return get('currencies')
  }

  static supported (params) {
    return get('supported-currencies', params)
  }

  static used (params) {
    return get('used-currencies', params)
  }

  static allUsed () {
    return get('currencies/used')
  }

  static exchangeRate (currencyId) {
    return get(`currencies/${currencyId}/exchange-rate`)
  }

  static updateExchangeRates (data) {
    return post('currencies/bulk-update-exchange-rate', data)
  }

  static converterServers () {
    return Config.get('currency_converter_servers')
  }

  static activeProviders (currencyId) {
    return get(`currencies/${currencyId}/active-provider`)
  }
}
