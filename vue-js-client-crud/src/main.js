import Vue from 'vue'
window.Vue = Vue

require('./bootstrap')

import App from './App.vue'
import router from './routes/index'
import Vuesax from 'vuesax'

Vue.config.productionTip = false
Vue.config.devtools = true

require('./utils/Event') // event bus
require('./components/views') // import components

// Vuex Store
import store from './store/store'

Vue.use(Vuesax, {
  colors: {
    primary:'#5b3cc4',
    info:'rgb(23, 201, 100)',
    success:'rgb(23, 201, 100)',
    danger:'rgb(242, 19, 93)',
    warning:'rgb(255, 130, 0)',
    dark:'rgb(36, 33, 69)'
  }
})

window.flash = function(details) {
  Event.fire('flash', details)
}

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')

import '@/sass/app.scss'
