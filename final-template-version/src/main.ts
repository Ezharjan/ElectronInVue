import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    process.env.NODE_ENV === "production" && this.$router.push("/");
  }
}).$mount("#app");
