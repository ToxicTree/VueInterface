
/* Get dependencies */
window.$ = require('jquery');
window.Vue = require('vue');

/* Configuration */
Vue.config.debug = true

/* Get App */
const App = require('./vue/App.vue');

/* Load Components */
App.components.Home = require('./vue/components/Home.vue')

/* Start App */
new Vue(App);
