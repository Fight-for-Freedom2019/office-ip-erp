<template>
    <el-switch :value="value"
               @change="handleInput"
               :active-color="cache.onColor"
               :inactive-color="cache.offColor"
               :active-text="cache.onText"
               :inactive-text="cache.offText"
               :active-value="cache.onValue"
               :inactive-value="cache.offValue">
    </el-switch>
</template>

<script>
    const config = [
        ['status', {
            onColor: '#13ce66',
            offColor: '#ff4949',
            onText: '启用',
            offText: '禁用',
            onValue: 1,
            offValue: 0,
        }],
        ['is', {
            onColor: '#13ce66',
            offColor: '#ff4949',
            onText: '是',
            offText: '否',
            onValue: 1,
            offValue: 0,
        }],
        // 添加布尔类型，不影响其它使用数字的
        ['is_boolean', {
            onColor: '#13ce66',
            offColor: '#ff4949',
            onText: '是',
            offText: '否',
            onValue: true,
            offValue: false,
        }]
    ];
    const map = new Map(config);

    export default {
        name: 'appSwitch',
        data() {
            return {
                cache: {
                    onColor: '',
                    offColor: '',
                    onText: '',
                    offText: '',
                    onValue: 1,
                    offValue: 0,
                },
            }
        },
        props: {
            value : [Number,Boolean],
            type :[Object,String],
            // simple参数控制选项是否在开关两头显示，为true时只在开关右侧显示onText和offText
            simple:{
                type:[Boolean,String],
                default(){
                    return false
                }
            }
        },
        methods: {
            handleInput(val) {
                this.$emit('input', val);
            },
            changeText(option) {
                option.Text = [option.offText, option.onText];
                this.value ? "" : option.onText = option.offText;
                option.offText = "";
                return option;
            }
        },
        created() {
            const config = map.get(this.type);
            this.simple?config?this.cache = this.changeText(config):this.cache = this.changeText(this.type):config ? this.cache = config : this.cache = this.type;
        },
        watch: {
            value: function (val, oldVal) {
                !this.simple ? "":val ? this.cache.onText = this.cache.Text[1] : this.cache.onText = this.cache.Text[0];
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .el-switch__label--right {
        height: 36px;
    }
</style>