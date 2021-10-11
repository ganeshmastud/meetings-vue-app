import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import Router from 'vue-router';
Vue.use(Vuex)
// we are running the init file
import './init';


Vue.use(Router)

// @ -> src/
// if we import a folder (as in /router) the index.js export will be imported
import router from '@/router';
import {store} from '@/stores';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
