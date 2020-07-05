import Vue from 'vue';
import store from '@/store';
import 'normalize.css';
import stomp from './utils/stomp';
import App from './App.vue';
import router from './router';
import '@/permission';
import '@/styles/index.scss'; // global css
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import VuetifyConfirm from 'vuetify-confirm';
import VuetifyToast from 'vuetify-toast-snackbar';
import VueClipboard from 'vue-clipboard2';
Vue.config.productionTip = false;
Vue.prototype.$stomp = stomp;

Vue.use(VuetifyConfirm, { vuetify });
Vue.use(VuetifyToast, {
  x: 'middle', // default
  y: 'top', // default
  color: 'info', // default
  icon: 'mdi-information',
  iconColor: '', // default
  classes: ['body-2'],
  timeout: 3000, // default
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: false, // default
  closeText: '', // default
  closeIcon: 'close', // default
  closeColor: '', // default
  slot: [], //default
  shorts: {
    custom: {
      color: 'purple',
    },
  },
  property: '$toast', // default
});
Vue.use(VueClipboard);
const vue = new Vue({
  router,
  store,
  vuetify,

  render: function (h) {
    return h(App);
  },
}).$mount('#app');
export default vue;
