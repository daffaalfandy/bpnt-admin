import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Swal from "sweetalert2";
import JwPagination from "jw-vue-pagination";
import * as pdfMake from "pdfmake/build/pdfmake"
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
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
window.pdfMake = pdfMake
window.pdfFonts = pdfFonts

window.EventBus = new Vue();

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");