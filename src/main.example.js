
// Get dependencies
window.Vue = require('vue');

// Get App
window.App = require('./vue/app.vue');

// Insert components in App
App.components['Home'] = require('./vue/components/Home.vue');
App.components['Another'] = require('./vue/components/Another.vue');
//App.components['NpmModule'] = require('npm_module');
//App.components['AnotherProject'] = require('../../anoher_project');

// Set element to mount on
App.el = '#app';

// Launch Application
new Vue(App);
