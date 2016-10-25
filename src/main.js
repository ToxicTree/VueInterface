
// Get dependencies
window.Vue = require('vue');
require('vue-resource');

// Configuration
Vue.config.debug = true

// Get App
window.App = require('./vue/app.vue');

// Load Components
var components = require('../components.js')

// Insert components in App
for (var c in components)
    App.components[c] = components[c];

// Set element to mount on
App.el = '#app';

// Launch Application
new Vue(App);
