
import App from './App.vue'

import LoadScript from 'vue-plugin-load-script';

window.DDApp = {
  Vue,
  modules: {},
  bizConf: {
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

//window.DDApp.registerBiz(255, 'tet')

window.DDApp.Vue.use(LoadScript);

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
  } 
}



new window.DDApp.Vue({
  el: '#app',
  render: h => h(App)
})
