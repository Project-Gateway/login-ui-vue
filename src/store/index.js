import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import parseJwt from '@/functions/parseJwt';
import router from '@/router';

Vue.use(Vuex);

const vuex = new Vuex.Store({
  state: {
    ready: false,
    socialUrls: null,
    socialReturnUrls: {
      google: window.location.href + '/oauth/google',
      facebook: window.location.href + '/oauth/facebook',
      twitter: window.location.href + '/oauth/twitter',
    },
    loginApi: null,
    scheduleApi: null,
    userId: null,
    createdAt: null,
    notBefore: null,
    expiresAt: null,
    emails: null,
    role: null,
    dbRole: null,
    childRoles: null,
    token: null,
  },
  getters: {
    logged: state => !!state.userId,
  },
  mutations: {
    'LOADING': (state) => {
      state.ready = false;
    },
    'READY': (state) => {
      state.ready = true;
    },
    'LOAD': function (state) {
      if(localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store')))
        );
      }
    },
    'INIT_API': (state) => {

      if (state.loginApi === null) {
        state.loginApi = axios.create({
          baseURL: 'https://local.pg.com/login-api/',
          headers: {
            'Accept': 'application/json',
            'X-Orion-Application': process.env.APPLICATION_NAME,
            'Authorization': `Bearer ${state.token}`
          }
        });
      }

      if (state.scheduleApi === null) {
        state.scheduleApi = axios.create({
          baseURL: 'https://local.pg.com/schedule-api/',
          headers: {
            'Accept': 'application/json',
            'X-Orion-Application': process.env.APPLICATION_NAME,
            'Authorization': `Bearer ${state.token}`
          }
        });

        state.scheduleApi.interceptors.response.use(response => response, error => {
          if (error.response.status === 401 || error.response.status === 403) {
            vuex.dispatch('logout').finally(() => { router.push('/'); });
          }
          return error;
        });
      }

    },
    'SET_SOCIAL_URLS': (state, { urls }) => { state.socialUrls = urls; },
    'LOGIN': (state, { token, userId, createdAt, notBefore, expiresAt, emails, role, dbRole, childRoles }) => {
      state.loginApi.defaults.headers['Authorization'] = `Bearer ${token}`;
      state.scheduleApi.defaults.headers['Authorization'] = `Bearer ${token}`;
      state.userId = userId;
      state.createdAt = createdAt;
      state.notBefore = notBefore;
      state.expiresAt = expiresAt;
      state.emails = emails;
      state.role = role;
      state.dbRole = dbRole;
      state.childRoles = childRoles;
      state.token = token;
    },
    'LOGOUT': (state) => {
      delete state.loginApi.defaults.headers['Authorization'];
      delete state.scheduleApi.defaults.headers['Authorization'];
      state.userId = null;
      state.createdAt = null;
      state.notBefore = null;
      state.expiresAt = null;
      state.emails = null;
      state.role = null;
      state.dbRole = null;
      state.childRoles = null;
      state.token = null;
    }

  },
  actions: {
    init: function ({state, commit}) {

      commit('LOADING');

      commit('LOAD');

      commit('INIT_API');

      if (state.socialUrls === null) {
        state.loginApi.request({
          url: `/auth/social/urls`,
          method: 'GET',
          params: {
            providers: [{
              provider: 'google',
              redirectUri: state.socialReturnUrls.google,
            }, {
              provider: 'facebook',
              redirectUri: state.socialReturnUrls.facebook,
            }, {
              provider: 'twitter',
              redirectUri: state.socialReturnUrls.twitter,
            }],
          },
        }).then((resp) => {
          commit('SET_SOCIAL_URLS', { urls: resp.data });
          commit('READY');
        });
      }
    },
    login: ({state, commit}, data) => new Promise((resolve, reject) => {
      state.loginApi.request({
        url: '/auth/login',
        method: 'post',
        data: data,
      }).then(response => {
        const identity = parseJwt(response.data.accessToken);
        identity.token = response.data.accessToken;
        identity.tokenType = response.data.tokenType;
        identity.emails = response.data.emails;
        commit('LOGIN', identity);
        resolve(response);
      }).catch(err => {
        commit('LOGOUT');
        reject(err);
      });
    }),
    logout: ({ state, commit }) => new Promise((resolve, reject) => {
      state.loginApi.request({
        url: '/auth/logout',
        data: {},
        method: 'post'
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      }).finally(() => {
        commit('LOGOUT');
      });
    }),
  },
});

vuex.dispatch('init');

vuex.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default vuex;
