import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Test from '@/components/Test';
import OAuth from '@/components/OAuth';
import Chat from '@/components/Chat';
import LoginPage from '@/components/LoginPage';
import RegisterPage from '@/components/RegisterPage';
import IndexCrudPage from '@/components/IndexCrudPage';


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
      path: '/login',
      name: 'Log In',
      component: LoginPage,
      meta: {
        requiresGuest: true,
      }
    },
    {
      path: '/register',
      name: 'Sign In',
      component: RegisterPage,
      meta: {
        requiresGuest: true,
      }
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/users/index',
      name: 'Index Users',
      component: IndexCrudPage,
      props: {
        breadcrumb: [
          {
            text: 'Users',
            to: '/users/index',
          },
          'index'
        ]
      },
      meta: {
        requiresAuth: true,
      }
    },{
      path: '/users/:id',
      name: 'Show User'
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
