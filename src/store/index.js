import Vue from 'vue';
import Vuex from 'vuex';
import identity from './modules/identity';
import auth from './modules/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'https://local.dungeon.city/api/',
    socialUrls: {},
  },
  modules: {
    identity,
    //auth
  },
});
