import daijia from './App.vue'

if (typeof window !== 'undefined' && window.DDApp.Vue) {
  window.DDApp.registerBiz(255, daijia)
}

