// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import router from './router';
import store from './store';
import * as VueGoogleMaps from 'vue2-google-maps';
import PubNubVue from 'pubnub-vue';

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
  publishKey: 'pub-c-bc1ba433-8a7e-40a1-bbb1-b498c93e0eaf'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
