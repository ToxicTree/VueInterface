# VueInterface
Basic interface for Vue components

#### About
This project is a testing-environment for writing modules/components in Vue.
Each component will have a tab in the Apps navigation.

#### Install
    ```bash
    git clone https://github.com/ToxicTree/VueInterface.git
    cd VueInterface
    npm install
    ```

#### Running developing-server
    ```bash
    php -S localhost:8000
    ```

#### Compile JS & CSS
    ```bash
    npm run build
    ```

#### Adding components
Everything listed in components.js will be loaded into the interface as vue-components.

    ```js
    exports.Component_Name = require(__PATH__)
    ```

Examples:

    ```js
    exports.ComponentFromSrc = require('./src/vue/components/Home.vue')
    exports.ComponentFromNPM = require('storageapi-editor')
    exports.ComponentFromOtherProject = require('../AnotherProject')
    ```

#### Used tools

[bootstrap](http://getbootstrap.com/), [vue.js](https://vuejs.org/), [node.js & npm](https://nodejs.org/en/)
