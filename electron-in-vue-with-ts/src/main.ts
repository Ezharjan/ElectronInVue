import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app');

// declare global {
//   interface Window { require: any; }
// }

declare global {
  interface Window {
    mywindow: any;
  }
}

window.mywindow = new Vue({
  render: h => h(App),
}).$mount('#app');