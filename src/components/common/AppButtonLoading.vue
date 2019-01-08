<template>
    <el-button @click="click" type="primary" size="small" :loading="loading">{{text}}</el-button>
</template>

<script>
    export default {
        name: "AppButtonLoading",
        data(){
            return {
                loading:false,
            }
        },
        props:{
            text:{
                type:String,
                default(){
                    return "新建"
                }
            },
            func:{
                type:Function,
                default(){
                    return ()=>{}
                },
            },
            param:{
                type:String,
                default(){
                    return "add"
                },
            }
        },
        methods:{
            click(){
                this.func(this.param);
            },
        }
    }
</script>

<style scoped>

</style>