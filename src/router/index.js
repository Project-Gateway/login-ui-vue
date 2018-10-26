import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Test from '@/components/Test';
import OAuth from '@/components/OAuth';
import Chat from '@/components/Chat';
import LoginPage from '@/components/LoginPage';
import RegisterPage from '@/components/RegisterPage';
import IndexCrudPage from '@/components/IndexCrudPage';
import UserForm from '@/components/UserForm';
import DatePicker from '../components/DatePicker';
import DraggableCal from 'vue-draggable-cal';
import BootstrapVue from 'bootstrap-vue';
import ServiceList from '../components/ServiceList';
import OpenServiceList from '../components/OpenServiceList';
import WorkingTimes from '../views/WorkingTimes.vue';
import * as uiv from 'uiv';

Vue.use(Router);
Vue.use(DatePicker);
Vue.use(BootstrapVue);
Vue.use(DraggableCal);
Vue.use(ServiceList);
Vue.use(OpenServiceList);
Vue.use(uiv);

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
      path: '/schedule',
      name: 'DatePicker',
      component: DatePicker,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/working-times',
      name: 'WorkingTimes',
      component: WorkingTimes,
      meta: {
        requiresAuth: true,
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
