<template>
    <div class="container">

        <div class="nav">
            <p class="navbar-brand" style="padding: 10px 15px 0px 15px; height:auto;">Vue-Components:</p>
            <ul class="nav nav-tabs"></ul>
        </div>

        <div id="content" class="tab-content" style="padding: 8px; border-left:1px solid #ddd;border-right:1px solid #ddd;border-bottom:1px solid #ddd;">
            <component :is="componentExists(nav.substring(1))"></component>
        </div>

    </div>
</template>

<script>
    export default {
        el() { return '#app' },
        components: {
            Tester : require('./components/Tester.vue')
        },
        data() {
            return { nav: '#Tester' }
        },
        methods: {
            componentExists(component) {
                if (this.$options.components[component])
                    return component;
            },
            initNav(){
                var content = "";
                
                for (var component in this.$options.components)
                    content += "<li><a href='#"+component+"' @click='navigate'>"+component+"</li>"

                this.$nextTick(function(){
                    $('.nav-tabs').html(content);
                    this.$compile($('.nav-tabs')[0]);
                    this.navigate();
                });
            },
            navigate(e) {
                var url = (e) ? e.target.href : window.location.href;

                var hash = url.substring(url.indexOf("#"));

                var nav = this.nav = (hash && hash.indexOf("#")>-1) ? hash : this.nav;
                
                this.$nextTick(function(){
                    $('.nav-tabs').children().each(function(){
                        this.classList.remove('active');
                        if (this.children[0].getAttribute('href')==nav)
                            this.classList.add('active');
                    });
                });
            }
        },
        created() {
            this.initNav();
        }
    }
</script>