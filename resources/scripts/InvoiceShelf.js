import { createApp } from 'vue'
import i18n from '@/scripts/i18n'
import router from '@/scripts/router'
import App from '@/scripts/App.vue'
import { defineGlobalComponents } from './global-components'
import utils from '@/scripts/helpers/utilities.js'
import { VTooltip } from 'v-tooltip'

const app = createApp(App)

export default class InvoiceShelf {
  constructor() {
    this.bootingCallbacks = []
  }

  booting(callback) {
    this.bootingCallbacks.push(callback)
  }

  executeCallbacks() {
    this.bootingCallbacks.forEach((callback) => {
      callback(app, router)
    })
  }

  start() {
    this.executeCallbacks()

    defineGlobalComponents(app)

    app.provide('$utils', utils)

    const { createPinia } = window.pinia

    app.use(router)
    app.use(i18n)
    app.use(createPinia())
    app.provide('utils', utils)
    app.directive('tooltip', VTooltip)
    app.mount('body')
  }
}
