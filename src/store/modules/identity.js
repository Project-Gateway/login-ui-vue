import api from '../../helpers/api';
import parseJwt from '../../functions/parseJwt';

export default {
  namespaced: true,
  state: {
    userId: null,
    createdAt: null,
    notBefore: null,
    expiresAt: null,
    socialUrls: null,
    token: null,
    emails: null,
    socialReturnUrls: {
      google: 'https://local.pg.com/oauth/google',
      facebook: 'https://local.pg.com/oauth/facebook',
      twitter: 'https://local.pg.com/oauth/twitter',
    },
  },
  getters: {
    logged: state => !!state.userId,
    socialUrls: state => state.socialUrls,
    socialReturnUrl: state => provider => state.socialReturnUrls[provider],
  },
  mutations: {
    setIdentity: (state, { userId, createdAt, notBefore, expiresAt, token, emails }) => {
      state.userId = userId;
      state.createdAt = createdAt;
      state.notBefore = notBefore;
      state.expiresAt = expiresAt;
      state.token = token;
      state.emails = emails;
    },
    setSocialUrls: (state, { urls }) => { state.socialUrls = urls; },
    removeIdentity: (state) => {
      state.userId = null;
      state.createdAt = null;
      state.notBefore = null;
      state.expiresAt = null;
      state.token = null;
    },
  },
  actions: {
    retrieveSocialLinks({ state, commit, getters }) {
      if (!state.socialUrls) {
        api.get('auth/social/urls', {
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
        }, (response) => {
          commit('setSocialUrls', { urls: response.data });
        });
      }
    },
    retrieveIdentityFromLocalStorage({ commit }) {
      const identity = JSON.parse(localStorage.getItem('identity'));
      if (identity !== null) {
        commit('setIdentity', identity);
      }
    },
    logUser({ commit }, { accessToken, tokenType, emails }) {
      const identity = parseJwt(accessToken);
      identity.token = accessToken;
      identity.tokenType = tokenType;
      identity.emails = emails;
      localStorage.setItem('identity', JSON.stringify(identity));
      commit('setIdentity', identity);
    },
    logout({ commit }) {
      api.post('auth/logout', null, null,
        () => {
          localStorage.removeItem('identity');
          commit('removeIdentity');
        },
        (error) => {
          console.log('error on logout', error);
        },
      );
    },
  },
};
