/**
 * Importing QR Code Reader CSS
 */
import 'vue-qrcode-reader/dist/vue-qrcode-reader.css'

/**
 * Importing aepp-components:
 *
 * - Global CSS: Global rules and resets
 */
import '@aeternity/aepp-components/dist/aepp.global.css'

/**
 * Importing list of aepp-components CSS
 */
import '@aeternity/aepp-components/dist/ae-address/ae-address.css'
import '@aeternity/aepp-components/dist/ae-button/ae-button.css'
import '@aeternity/aepp-components/dist/ae-icon/ae-icon.css'
import '@aeternity/aepp-components/dist/ae-identicon/ae-identicon.css'
import '@aeternity/aepp-components/dist/ae-input/ae-input.css'
import '@aeternity/aepp-components/dist/ae-slider/ae-slider.css'
import '@aeternity/aepp-components/dist/ae-text/ae-text.css'

/**
 * Vue Related packages
 */
import Vue from 'vue'

/**
 * Importing Root View
 */
import View from './view'

/**
 * Vue Properties
 * @type {boolean}
 */
Vue.config.productionTip = true

/**
 * Exporting $vm instance
 */
export default new Vue({
  render: h => h(View),
}).$mount('#view')
