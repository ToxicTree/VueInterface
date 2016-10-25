<template>
    <div class="container">
        <div class="nav">
            <p class="navbar-brand App__title">{{$options.name}}</p>
            <ul class="nav nav-tabs">
                <li v-for="(c, name) in this.$options.components"
                    :class="('#'+name == nav) ? 'active' : ''">
                    <a :href="'#'+name">
                        {{name}}
                    </a>
                </li>
            </ul>
        </div>
        <div class="tab-content App__content">
            <component :is="componentExists(nav.substring(1))"></component>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'VueInterface',
        data() {
            return { nav: '#Home' }
        },
        components: { },
        methods: {
            componentExists(c) {
                return (this.$options.components[c]) ? c : false;
            },
            initNav(){
                window.onhashchange = () => this.nav = window.location.hash;
                this.nav = window.location.hash || this.nav;
            }
        },
        created() {
            this.initNav();
        }
    }
</script>
