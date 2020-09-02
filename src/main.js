import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Swal from "sweetalert2";
import "./style.scss";
import "./bootstrap";

Vue.config.productionTip = false;

window.Swal = Swal;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
