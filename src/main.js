import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Swal from "sweetalert2";
import JwPagination from "jw-vue-pagination";
import "./style.scss";
import "./bootstrap";

Vue.config.productionTip = false;
Vue.mixin({
  methods: {
    formatKks: (kks) => kks.match(/.{1,4}/g).join("-"),
  },
});
Vue.component("jw-pagination", JwPagination);

window.Swal = Swal;

window.EventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
