import Resource from './request'
import Config from './config'

export default class ExchangeRateProvider extends Resource {
  static get path () {
    return 'exchange-rate-providers'
  }

  static defaults () {
    return Config.get('exchange_rate_drivers')
  }
}
