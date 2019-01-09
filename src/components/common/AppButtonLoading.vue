<template>
    <el-button @click="click" :disabled="disabled" type="primary" size="small" :loading="loading">{{text}}</el-button>
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
            disabled:{
                type:Boolean,
                default(){
                    return false
                },
            },
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
        computed:{
            multiple:function () {
                return /,/.test(this.param);
            }
        },
        methods:{
            click(){
                this.multiple?this.func(...this.param.split(",")):this.func(this.param);
            },
        }
    }
</script>

<style scoped>

</style>