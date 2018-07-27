import axios from 'axios';
import store from './../store/index';

const api = {
  url: process.env.API_URL,
  authToken: () => store.state.identity.token,
  get(route, queryParams, successCallback, failCallback) {
    const authToken = this.authToken();
    axios.get(
      `${this.url}/${route}`,
      {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    ).then(successCallback).catch(failCallback);
  },
  post(route, payload, queryParams = {}, successCallback, failCallback) {
    const authToken = this.authToken();
    axios.post(
      `${this.url}/${route}`,
      payload,
      {
        params: queryParams,
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }).then(successCallback).catch(failCallback);
  },
};
export default api;
