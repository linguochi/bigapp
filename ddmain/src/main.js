
import App from './App.vue'

import LoadScript from 'vue-plugin-load-script'

const Taxi = require('./Taxi.vue')

window.DDApp = {
  Vue,
  VueResource,
  VueRouter,
  Vuex,

  modules: {},
  bizConf: {
    254: {
      name: 'taxi',
      component: Taxi
    },
    255: {
      name: 'daijia',
      src: 'http://127.0.0.1:8585/dist/build.js'
    },
    256: {
      name: 'gongjiao',
      src: 'http://127.0.0.1:8686/dist/build.js'
    },
  },
  registerBiz(id, component) {
    this.modules[id] = component
  }
}

// VueResource
window.DDApp.Vue.use(window.DDApp.VueResource)

// 配置路由
window.DDApp.Vue.use(window.DDApp.VueRouter)

// 配置vuex
window.DDApp.Vue.use(window.DDApp.Vuex)

window.DDApp.Vue.use(LoadScript)

for (let id in window.DDApp.bizConf) { 
  let conf = window.DDApp.bizConf[id] 
  if (conf.src) { 
    //window.DDApp.modules[id] = conf.name 
    window.DDApp.Vue.component(conf.name, (resolve, reject) => { 
      window.DDApp.Vue.loadScript(conf.src).then(() => { 
        resolve(window.DDApp.modules[id]) 
      }).catch(() => { 
        reject() 
      }) 
    }) 
  } else {
    window.DDApp.Vue.component(conf.name, (resolve, reject) => {
      conf.component ? resolve(conf.component) : reject()
    }) 
  }
}



const routes = [
  { path: '/', component: Taxi },
  { path: '/taxi', component: Taxi }
]

const router = new window.DDApp.VueRouter({
  routes // （缩写）相当于 routes: routes
})

new window.DDApp.Vue({
  el: '#app',
  router,
  render: h => h(App)
})
