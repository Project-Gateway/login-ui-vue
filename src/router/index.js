import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Test from '@/components/Test';
import OAuth from '@/components/OAuth';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/oauth/:provider',
      name: 'oauth',
      component: OAuth,
      props: route => ({
        provider: route.params.provider,
        query: route.query,
      }),
    },
  ],
});
