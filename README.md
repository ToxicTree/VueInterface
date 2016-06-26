# VueInterface
Basic interface for Vue components

#### About
This project is a testing-environment for writing modules/components in Vue.
Each component will have a tab in the Apps navigation.

#### Install
    git clone https://github.com/ToxicTree/VueInterface.git
    cd VueInterface
    npm install
    gulp

#### Running developing-server
    php -S localhost:8000

#### Update App on changes
    gulp watch

#### Adding components
Everything listed in components.js will be loaded into the interface as vue-components.

    exports.Component_Name = require(__PATH__)

Examples:

    exports.ComponentFromSrc = require('./src/vue/components/Home.vue')
    exports.ComponentFromNPM = require('storageapi-editor')
    exports.ComponentFromOtherProject = require('../AnotherProject')

#### Used tools
[jquery](http://jquery.com), [bootstrap](http://getbootstrap.com/), [vue.js](https://vuejs.org/), [node.js & npm](https://nodejs.org/en/), [gulp](http://gulpjs.com/), [laravel-elixir](https://laravel.com/docs/5.2/elixir)
