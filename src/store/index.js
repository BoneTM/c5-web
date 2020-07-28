import Vue from 'vue';
import Vuex from 'vuex';
import admin from './modules/admin';
import site from './modules/site';
import tagsView from './modules/tagsView';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    admin,
    site,
    tagsView,
  },
  getters,
});

export default store;
