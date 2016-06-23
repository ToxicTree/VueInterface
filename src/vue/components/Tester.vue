<template>
    <div>
        Test {{ status }}
    </div>
</template>

<script>
	export default {
        data() {
            return {
                status: '...'
            }
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