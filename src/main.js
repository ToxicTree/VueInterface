window.Vue = require('vue');

// Configure the application
Vue.config.debug = true

const App = require('./vue/App.vue');

new Vue(App);
