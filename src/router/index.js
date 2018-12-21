/**
 * Import Router Library
 */
import Vue from 'vue'
import Router from 'vue-router'

/**
 * Installing Vue Router
 */
Vue.use(Router)

/**
 * Export Router Configuration
 */
export default new Router({
  base: process.env.BASE_URL,
  routes: [{
    name: 'redeem',
    path: '/',
    component: require('../view/redeem/index.vue').default
  }, {
    name: 'transfer',
    path: '/transfer',
    component: require('../view/transfer/index.vue').default
  }, {
    name: 'status',
    path: '/status/:hash',
    component: require('../view/status/index.vue').default
  }]
})
