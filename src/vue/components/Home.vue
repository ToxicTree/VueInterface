<template>
    <div id="test1">
        Test {{ status }}
    </div>
</template>

<script>
    export default {
        name: 'Home',
        data() {
            return { status: '...' }
        },
        methods: {
            changeStatus(){
                this.status = 'ok';
            }
        },
        created() {
            this.changeStatus();
        }
    }
</script>

<style>
    #test1 {
        color: #f00;
    }
</style>
