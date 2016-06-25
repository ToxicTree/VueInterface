<template>
    <div class="container">

        <div class="nav">
            <p class="navbar-brand App__title">Vue-Components:</p>
            <ul class="nav nav-tabs"></ul>
        </div>

        <div class="tab-content App__content">
            <component :is="componentExists(nav.substring(1))"></component>
        </div>

    </div>
</template>

<script>
    export default {
        el() { return '#app' },

        data() {
            return { nav: '#Home' }
        },
        components: { },
        methods: {
            componentExists(component) {
                if (this.$options.components[component])
                    return component;
            },
            initNav() {
                var content = "";
                
                for (var component in this.$options.components)
                    content += "<li><a href='#"+component+"'>"+component+"</li>";

                $('.nav-tabs').html(content);

                window.onhashchange = this.navigate;

                this.navigate();
            },
            navigate() {
                var url = window.location.href;

                var nav = this.nav = (url.indexOf("#")>0) ? url.substring(url.indexOf("#")) : this.nav;
                
                $('.nav-tabs').children().each(function(){
                    this.classList.remove('active');
                    if (this.children[0].getAttribute('href')==nav)
                        this.classList.add('active');
                });
            }
        },
        ready() {
            this.initNav();
        }
    }
</script>