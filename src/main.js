// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.min.css';
import 'open-iconic/font/css/open-iconic-bootstrap.min.css';
import App from './App';
import store from './store';
import router from './router';
import * as VueGoogleMaps from 'vue2-google-maps';
import PubNubVue from 'pubnub-vue';
import '@devexpress/dx-vue-grid-bootstrap4/dist/dx-vue-grid-bootstrap4.css';
import FullCalendar from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.min.css";
import DefaultLayout from "./layouts/Default.vue";
import AdminLayout from "./layouts/Admin.vue";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDCSrHo54xGO5jQqtSdBn_LnSbx97ID5j0",
    libraries: "places" // necessary for places input
  }
});

Vue.use(PubNubVue, {
  subscribeKey: 'sub-c-fce045dc-95bc-11e8-9a78-8ae329637954',
  publishKey: 'pub-c-bc1ba433-8a7e-40a1-bbb1-b498c93e0eaf',
});

Vue.use(FullCalendar);

Vue.component('default-layout', DefaultLayout);
Vue.component('admin-layout', AdminLayout);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
