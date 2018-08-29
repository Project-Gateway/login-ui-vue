import parseJwt from '../../functions/parseJwt';
import axios from 'axios';
import loginApiConfig from '../../config/login-api';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('user-token') || '',
    application: 'niceboat',

    ready: false,
    userId: null,
    createdAt: null,
    notBefore: null,
    expiresAt: null,
    socialUrls: null,
    // token: null,
    emails: null,
    role: null,
    dbRole: null,
    childRoles: null,
    socialReturnUrls: {
      google: window.location.href + '/oauth/google',
      facebook: window.location.href + '/oauth/facebook',
      twitter: window.location.href + '/oauth/twitter',
    },
  },
  getters: {
    logged: state => !!state.userId,
    socialUrls: state => state.socialUrls,
    socialReturnUrl: state => provider => state.socialReturnUrls[provider],
  },
  mutations: {
    'SET_IDENTITY': (state, { userId, createdAt, notBefore, expiresAt, token, emails, role, dbRole, childRoles }) => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      state.userId = userId;
      state.createdAt = createdAt;
      state.notBefore = notBefore;
      state.expiresAt = expiresAt;
      state.token = token;
      state.emails = emails;
      state.role = role;
      state.dbRole = dbRole;
      state.childRoles = childRoles;
    },
    'SET_READY': (state) =>{
      state.ready = true;
    },
    'SET_SOCIAL_URLS': (state, { urls }) => { state.socialUrls = urls; },
    'REMOVE_IDENTITY': (state) => {
      state.userId = null;
      state.createdAt = null;
      state.notBefore = null;
      state.expiresAt = null;
      state.token = null;
    },
  },
  actions: {
    setupLoginApi: ({ state }) => {
      axios.defaults.headers.common['X-Orion-Application'] = 'niceboat';
    },
    retrieveSocialLinks: ({ state, commit, getters }) => {
      if (!state.socialUrls) {
        axios({
          url: `${loginApiConfig.URL}/auth/social/urls`,
          method: 'GET',
          params: {
            providers: [{
              provider: 'google',
              redirectUri: getters.socialReturnUrl('google'),
            }, {
              provider: 'facebook',
              redirectUri: getters.socialReturnUrl('facebook'),
            }, {
              provider: 'twitter',
              redirectUri: getters.socialReturnUrl('twitter'),
            }],
          },
        }).then((resp) => {
          commit('SET_SOCIAL_URLS', { urls: resp.data });
        });
      }
    },
    retrieveIdentityFromLocalStorage: ({ commit }) => {
      const identity = JSON.parse(localStorage.getItem('identity'));
      if (identity !== null) {
        commit('SET_IDENTITY', identity);
      }
      commit('SET_READY');
    },
    logUser: ({ commit }, { accessToken, tokenType, emails }) => {
      const identity = parseJwt(accessToken);
      identity.token = accessToken;
      identity.tokenType = tokenType;
      identity.emails = emails;
      localStorage.setItem('identity', JSON.stringify(identity));
      commit('SET_IDENTITY', identity);
    },
    login: ({state, commit, dispatch}, data) => new Promise((resolve, reject) => {
      axios({url: `${loginApiConfig.URL}/auth/login`, data: data, method: 'POST' }).then(resp => {
        const token = resp.data.accessToken;
        localStorage.setItem('user-token', token);
        dispatch('logUser', resp.data);
        resolve(resp)
      }).catch(err => {
        localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
        reject(err);
      });
    }),
    register: ({state, commit, dispatch}, data) => new Promise((resolve, reject) => {
      axios({url: `${loginApiConfig.URL}/auth/register`, data: data, method: 'POST' }).then(resp => {
        const token = resp.data.accessToken;
        localStorage.setItem('user-token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch('logUser', resp.data);
        resolve(resp)
      }).catch(err => {
        localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
        reject(err);
      });
    }),
    logout: ({ commit }) => new Promise((resolve, reject) => {
      localStorage.removeItem('user-token');
      localStorage.removeItem('identity');
      commit('REMOVE_IDENTITY');
      axios({url: `${loginApiConfig.URL}/auth/logout`, data: {}, method: 'POST'}).then(resp => {
        resolve(resp);
      }).catch(err => {
        reject(err);
      }).finally(() => {
        delete axios.defaults.headers.common['Authorization'];
      });
    }),
  },
};
