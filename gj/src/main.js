import gongjiao from './App.vue'

if (typeof window !== 'undefined' && window.DDApp.Vue) {
  window.DDApp.registerBiz(256, gongjiao)
}