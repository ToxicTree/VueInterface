
/* Get dependencies */
window.$ = require('jquery');
window.Vue = require('vue');

/* Configuration */
Vue.config.debug = true

/* Get App */
const App = require('./vue/App.vue');

/* Start App */
new Vue(App);
