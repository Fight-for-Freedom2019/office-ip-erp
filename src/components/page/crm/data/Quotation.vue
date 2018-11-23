<template>
    <div class="Quotation">
        <table-component :tableOption="tableOption" :data="tableData" ref="table" @refresh="refresh" @update="update"
                         @refreshTableData="refreshTableData"></table-component>
        <app-shrink :visible.sync="isPanelVisible" :modal='false' :title="title">
            <span slot="header" style="float: right;">
                <el-button type="primary" size="small" @click="save">保存</el-button>
            </span>
            <el-form v-model="form" label-position="right" label-width="120px" :rules="rules" style="margin-top: 10px;">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="上级分类" prop="parent">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="分类名称" prop="name">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="分类描述" prop="description">
                            <el-input></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </app-shrink>
    </div>
</template>
<script>
    import TableComponent from '@/components/common/TableComponent'
    import AppShrink from '@/components/common/AppShrink'
    import TableMixins from '@/mixins/table-mixins'
    import {mapGetters} from 'vuex'
    export default {
        name: 'Quotation',
        mixins:[TableMixins],
        data () {
            return {
                tableOption: {
                    'name': 'QuotationList',
                    'url': this.URL,
                    'height': 'default',
                    'highlightCurrentRow': true,
                    'is_search': true,
                    'search_placeholder': '',
                    'rowClick': this.handleRowClick,
                    'header_btn': [
                        {type: 'add',click:this.add},
                        {type: 'delete'},
                        {type: 'control'},
                    ],
                    'columns': [
                        {type: 'selection'},
                        {type: 'text', label: '名称', prop: 'name', min_width: '178', render_header: true},
                        {type: 'text', label: '分类描述', prop: 'description', width: '120', render_header: true},
                        {type: 'text', label: '全路径名称', prop: 'fullname', width: '150', render_header: true},
                        {type: 'text', label: '子分类', prop: 'children', width: '180',render_header: true},
                        {type: 'text', label: '分类下的专利数量', prop: 'count', width: '120'},
                    ],
                },
                URL:"/classifications",
                tableData: [],
                isPanelVisible:false,
                title:"新增",
                form:{
                    parent:"",
                    name:"",
                    description:"",
                },
                rules:{

                },
            };
        },
        computed: {
            ...mapGetters([
                'caseMap',
            ]),
        },
        methods: {
            refreshTableData (option) {
                const success = _ => {
                    this.closeVisible("isPanelVisible");
                    this.tableData = _.data;
                };
                const data = Object.assign({}, option);
                this.$axiosGet({
                    url: this.URL,
                    data: data,
                    success,
                })
            },
            handleRowClick(row){
                this.title = "修改";
            },
            save(){},
            add(){
                this.openVisible("isPanelVisible");
            },
        },
        components: {
            TableComponent,
            AppShrink,
        },

    }
</script>