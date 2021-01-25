import Vue from 'vue';
import App from './App.vue';

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import { routes } from './routes';
import './directives/Trasform';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate);

Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';

const router = new VueRouter({
    routes,
    mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
