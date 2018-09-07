export default {
  namespaced: true,
  state: {
    geoLocation: {}
  },
  getters: {
    geoLocation: state => state.geoLocation,
  },
  mutations: {
    'SAVE_LOCATION': (state, location) => {
      state.geoLocation = location;
    },
  },
  actions: {
    saveLocation: ({commit}, location) => {
        localStorage.setItem('geoLocation', location);
        commit('SAVE_LOCATION', location);
    },
  },
};
