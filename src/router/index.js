import Vue from 'vue';
import Router from 'vue-router';
import Test from '@/components/Test';
import OAuth from '@/components/OAuth';
import Chat from '@/components/Chat';
import RegisterPage from '@/components/RegisterPage';
import IndexCrudPage from '@/components/IndexCrudPage';
import UserForm from '@/components/UserForm';
import DatePicker from '../components/DatePicker';
import DraggableCal from 'vue-draggable-cal';
import BootstrapVue from 'bootstrap-vue';
import ServiceList from '../components/ServiceList';
import OpenServiceList from '../components/OpenServiceList';
import WorkingTimes from '../pages/WorkingTimes.vue';
import * as uiv from 'uiv';
import store from '@/store/index';

Vue.use(Router);
Vue.use(DatePicker);
Vue.use(BootstrapVue);
Vue.use(DraggableCal);
Vue.use(ServiceList);
Vue.use(OpenServiceList);
Vue.use(uiv);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Home'),
    },
    {
      path: '/login',
      name: 'Log In',
      component: () => import('@/pages/Login'),
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
      path: '/schedule',
      name: 'DatePicker',
      component: DatePicker,
      meta: {
        requiresAuth: true,
        requiresCustomer: true,
      }
    },
    {
      path: '/working-times',
      name: 'WorkingTimes',
      component: WorkingTimes,
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      }
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
        ],
        indexConfig: {
          apiRoute: '/users',
          columnsConfig: [
            {name: 'email', title: 'Email'},
            {name: 'created_at', title: 'Created'},
            {name: 'updated_at', title: 'Updated'},
          ],
          rowsCallback: ({emails, ...rest}) => ({
            email: `${emails.shift().email} ` + (emails.length ? `+${emails.length}` : ''),
            ...rest
          }),
        },
        newButton: {
          label: "New User",
          route: '/users/new'
        }
      },
      meta: {
        requiresAuth: true,
      }
    },{
      path: '/users/new',
      name: 'New User',
      component: UserForm

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

router.beforeEach((to, from, next) => {

  // function that control the access
  const guard = () => {

    // user must be authenticated
    if (to.meta.requiresAuth && !store.getters['logged']) {
      return next('/');
    }

    // user must be anonymous
    if (to.meta.requiresGuest && store.getters['logged']) {
      return next('/');
    }

    // user must be admin
    if (to.meta.requiresAdmin && !['admin', 'professional'].includes(store.state.role)) {
      return next('/');
    }

    // user must be customer
    if (to.meta.requiresCustomer && store.state.role !== 'customer') {
      return next('/');
    }

    // everything ok
    return next();

  };

  // if the auth state is ready go forward
  if (store.state.ready) {
    return guard();
  }

  //if it's still been read from local storage, watch the ready state
  store.watch(
    (state) => state.ready,
    (value) => {
      if (value) {
        guard();
      }
    }
  );
});

export default router;
