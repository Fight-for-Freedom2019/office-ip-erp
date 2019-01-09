<!-- 专利族新增 -->
<!-- FamilyAdd -->
<template>
    <div class="main" >
        <app-shrink :visible.sync="dialogVisible"  :title="title" :size="`small`">
            <span slot="header" style="float: right;">
                <!--<el-button type="primary" @click="save(mode)" v-if="mode === 'add'" size="small">新建</el-button>-->
                <app-button-loading :func="save" :param="mode" v-if="mode === 'add'" ref="loadingBtn"></app-button-loading>
                <el-button type="primary" @click="save(mode)" v-if="mode === 'edit'" size="small">保存</el-button>
            </span>
            
            <el-form label-position="top" label-width="90px" :model="form" :rules="rules" ref="form"  v-loading="loadingVisible" :element-loading-text="loadingText" style="margin-top:10px;">
                <el-form-item label="专利族类型" prop="family_type">
                    <static-select type="family_type" v-model="form.family_type"></static-select>
                </el-form-item>

                <el-form-item label="专利族名称" prop="name">
                    <el-input v-model="form.name" placeholder="请输入专利族名称"></el-input>
                </el-form-item>
            </el-form>
        </app-shrink>
    </div>
</template>

<script>
    import StaticSelect from "@/components/form/StaticSelect";
    import AppShrink from '@/components/common/AppShrink'

    const URL = "/families";

    export default {
        name: "FamilyAdd",
        props: {
        },
        data() {
            return {
                form: {
                    family_type: "",
                    name: "",
                },
                rules: {
                    family_type: {
                        required: true,
                        message: "请选择专利族类型",
                        trigger: "change"
                    },
                    name: {
                        required: true,
                        message: "请输入专利族名称",
                        trigger: "change"
                    }
                },
                id:0,
                mode:'edit',
                dialogVisible: false,
                title:'',
                loadingVisible:false,
                loadingText:'专利族数据加载中...'
            };
        },
        methods: {
            save(type) {
                this.$refs['form'].validate((valid)=>{
                    if(valid){
                        const data = this.form;
                        if (type === "add") {
                            this.$axiosPost({
                                url: URL,
                                data,
                                success: (_) => {
                                    this.$message({type: "success", message: _.info});
                                    this.$emit("refresh");
                                    this.$emit("onItemAdded",_.family);
                                    this.dialogVisible = false;
                                }
                            });
                        } else {
                            let url = "/contracts/" + this.id;
                            data.id = this.id;
                            this.$axiosPut({
                                url,
                                data,
                                success: (_) => {
                                    this.$message({type: "success", message: _.info});
                                    this.$emit("update");
                                }
                            });
                        }
                    } else {
                        this.$message({type: 'warning', message: '请正确填写'});
                        return;
                    }
                })
                
            },

            coverObj(val) {
                if (val) {
                    this.$tool.coverObj(this.form, val, {obj: ['family_type']});
                }
            },
            clear(){
                this.$refs.form.resetFields();
            },
            show(id,mode) {
                this.mode = mode;
                if (mode == 'add') {
                    this.title = '新建专利族';
                }
                if (!this.dialogVisible) {
                    this.dialogVisible = true;
                }
            },
        },
        computed: {
        },
        mounted() {
        },
        watch: {
        },
        components: {
            StaticSelect,
            AppShrink,
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>