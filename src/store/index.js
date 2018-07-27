import Vue from 'vue';
import Vuex from 'vuex';
import identity from './modules/identity';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiUrl: 'https://local.dungeon.city/api/',
    socialUrls: {},
  },
  modules: {
    identity,
  },
});
