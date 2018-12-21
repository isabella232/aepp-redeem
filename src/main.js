/**
 * Importing aepp-components:
 *
 * - Global CSS: Global rules and resets
 * - Components CSS: Specific components CSS
 */
import '@aeternity/aepp-components/dist/aepp.global.css'
import '@aeternity/aepp-components/dist/aepp.components.css'

/**
 * Vue Related packages
 */
import Vue from 'vue'

/**
 * Importing Root View
 */
import Views from './views'

/**
 * Importing aepp-components library
 */
import Components from '@aeternity/aepp-components'

/**
 * Installing Vue Dependencies
 */
Vue.use(Components)

/**
 * Vue Properties
 * @type {boolean}
 */
Vue.config.productionTip = false

/**
 * Exporting $vm instance
 */
export default new Vue({
  render: h => h(Views),
}).$mount('#app')
