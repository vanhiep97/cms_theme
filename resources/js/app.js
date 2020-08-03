require('./bootstrap');
import Vue from 'vue'
import Meta from 'vue-meta'
import App from './App'
import router from './router'
import store from './store'
import i18n from './plugins/i18n';
import Cookies from 'js-cookie';
import { loadVeeValidate } from './plugins/vee-validate';
loadVeeValidate(Cookies.get('locale') || 'ja')
import BootstrapVue from 'bootstrap-vue';
import { IconsPlugin } from 'bootstrap-vue';

Vue.use(Meta);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false

import MainLayout from './layouts/MainLayout.vue'
import GuestLayout from './layouts/GuestLayout.vue'

Vue.component("MainLayout", MainLayout);
Vue.component("GuestLayout", GuestLayout);

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
