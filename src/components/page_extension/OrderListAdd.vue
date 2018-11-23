<!-- 新增订单 -->
<template>
    <div class="main" style="margin-top:10px;">
        <el-form label-width="120px" :model="form" :rules="rules" ref="form">
            <el-form-item label="客户" prop="customer">
                <remote-select type="customer" v-model="form.customer"></remote-select>
            </el-form-item>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="联系人" prop="contacts">
                        <jump-select type="contacts" v-model="form.contacts"></jump-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="销售" prop="sales">
                        <jump-select type="user" v-model="form.sales"></jump-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="交付日期" prop="delivery_date">
                        <el-date-picker value-format="yyy-MM-dd" v-model="form.delivery_date"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="备注" prop="remark">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="服务项目" prop="services">
                        <el-button type="text" @click="add">新增</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <table-component :tableOption="tableOption" :data="tableData" ref="table"></table-component>
        <el-dialog :visible.sync="visibleAdd" title="新增服务项目" :modal="false" width="600px">
            <el-form ref="servicesForm" v-model="servicesForm" label-position="right" label-width="120px" :rules="servicesRules">
                <el-form-item label="服务项目" prop="service">
                    <jump-select type="user" v-model="servicesForm.service"></jump-select>
                </el-form-item>
                <el-form-item label="单价" prop="unit_price">
                    <el-input type="text" v-model.number="servicesForm.unit_price"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="amount">
                    <el-input type="text" v-model.number="servicesForm.amount"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="save">保存</el-button>
                    <el-button @click="()=>{visibleAdd = false}">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import StaticSelect from "@/components/form/StaticSelect";
    import RemoteSelect from "@/components/form/RemoteSelect";
    import JumpSelect from "@/components/form/JumpSelect";
    import TableComponent from '@/components/common/TableComponent'

    export default {
        name: "OrderAdd",
        data() {
            return {
                form: {
                    customer: {},
                    contacts: {},
                    sales: {},
                    delivery_date: "",
                    services: {},
                    remark: "",
                },
                rules: {
                    customer:[
                        {required:true,message:"请选择客户",trigger:"blur"},
                    ],
                    contacts:[
                        {required:true,message:"请选择联系人",trigger:"blur"},
                    ],
                    sales:[
                        {required:true,message:"请选择销售",trigger:"blur"},
                    ],
                    delivery_date:[
                        {type:"date",required:true,message:"请选择交付日期",trigger:"blur"},
                    ],
                },
                servicesForm:{
                    service:{
                        id:1,
                        name:"发明专利申请服务",
                    },
                    unit_price:5000,
                    amount:2
                },
                servicesRules:{},
                visibleAdd:false,
                tableData:[],
                tableOption: {
                    'height': 390,
                    'is_search':false,
                    'is_pagination':false,
                    'columns': [
                        {type: 'text', label: '服务项目', prop: 'service', render_simple:"name", min_width: '178', render_header: true},
                        {type: 'text', label: '单价', prop: 'unit_price', render_simple:"name", width: '120', render_header: true},
                        {type: 'text', label: '数量', prop: 'amount', width: '150', render_header: true},
                        {type: 'text', label: '小计', prop: 'sum', width: '180', render_simple:"name",render_header: true},
                        {
                            type: 'action',
                            btns: [
                                { type: 'delete'},
                            ],
                        }
                    ],
                },
            }
        },
        methods:{
            save(){},
            add(){
                this.visibleAdd = true;
            },
        },
        components: {
            StaticSelect,
            RemoteSelect,
            JumpSelect,
            TableComponent
        },
    }
</script>

<style scoped>

</style>