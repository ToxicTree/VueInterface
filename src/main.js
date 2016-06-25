
/* Get dependencies */
window.$ = require('jquery');
window.Vue = require('vue');

/* Configuration */
Vue.config.debug = true

/* Get App */
const App = require('./vue/App.vue');

/* Load Components */
var components = require('../components.js')
for (var c in components)
	App.components[c] = components[c];

/* Start App */
new Vue(App);
