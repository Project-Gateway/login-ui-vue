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
import router from './router';
import store from './store';
import * as VueGoogleMaps from 'vue2-google-maps';
import PubNubVue from 'pubnub-vue';
import '@devexpress/dx-vue-grid-bootstrap4/dist/dx-vue-grid-bootstrap4.css';

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

router.beforeEach((to, from, next) => {

  // function that control the access
  const guard = () => {

    // user must be authenticated
    if (to.meta.requiresAuth && !store.getters['identity/logged']) {
      return next('/');
    }

    // user must be anonymous
    if (to.meta.requiresGuest && store.getters['identity/logged']) {
      return next('/');
    }

    // everything ok
    return next();

  };

  // if the auth state is ready go forward
  if (store.state.identity.ready) {
    return guard();
  }

  // if it's still been read from local storage, watch the ready state
  store.watch(
    (state) => state.identity.ready,
    (value) => {
      if (value) {
        guard();
      }
    }
  );
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
