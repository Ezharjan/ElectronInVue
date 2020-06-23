let Vue: typeof Vue = require('vue');
let App = require('./App.vue');

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')