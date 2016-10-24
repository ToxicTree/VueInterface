<template>
    <div id="test2">
        Test {{ status }}
    </div>
</template>

<script>
    export default {
        name: 'Another',
        data() {
            return { status: '...' }
        },
        methods: {
            changeStatus(){
                this.status = 'another ok';
            }
        },
        created() {
            this.changeStatus();
        }
    }
</script>

<style>
    #test2 {
        color: #333;
    }
</style>
