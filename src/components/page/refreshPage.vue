<template>
    
</template>

<script>
    export default {
        name: "refreshPage",
        beforeRouteEnter(to, from, next) {
            next(vm => {
                // 马上返回会出现切换的dialog没有关闭的情况
                setTimeout(()=>{
                    vm.$router.replace(from.path)
                },500)

            })
        }
    }
</script>

<style scoped>

</style>