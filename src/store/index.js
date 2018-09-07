import Vue from 'vue';
import Vuex from 'vuex';
import identity from './modules/identity';
import auth from './modules/auth';
import geo from './modules/geo';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'https://local.pg.com/api/',
    socialUrls: {},
  },
  modules: {
    identity,
    geo
    //auth
  },
});
