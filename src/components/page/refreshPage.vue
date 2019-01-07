<template>
    
</template>

<script>
    export default {
        name: "refreshPage",
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.$router.replace(from.path)
            })
        }
    }
</script>

<style scoped>

</style>