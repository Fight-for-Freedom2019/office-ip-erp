import {handlePadding, handleSingle} from '../formConfig/handle/handle'

const template = `
<div class="custom-checkbox">
    <el-checkbox @change="change('extend_notice_duetime')" v-model="extendData.extend_notice_duetime" label="extend_notice_duetime">
        <span>根据专利法实施细则第86条第3款的规定，请求延长上述专利申请或者专利的中止程序</span>
    </el-checkbox>
    <el-checkbox @change="change('extend_prohibition')" v-model="extendData.extend_prohibition" label="extend_prohibition">
        <span>根据专利法实施细则第6条第4款的规定，请求延长国家知识产权局于</span>
        <el-date-picker type="date" v-model="extendData.notice_date" placeholder="请输入通知书日期"></el-date-picker>
        <span>日发出的</span>
        <el-input v-model="extendData.notice_name" placeholder="请输入通知书名称"></el-input>
        <span>（发文序号</span>
        <el-input v-model="extendData.notice_serial" placeholder="请输入发文序列号"></el-input>
        <span>）指定期限</span>
    </el-checkbox>
</div>
`;

const options = {
    data(){
        return {
            extendData:{
                extend_notice_duetime:false,
                extend_prohibition:false,
                notice_date:"",
                notice_name:"",
                notice_serial:"",
            },
            checked:"",
            checkboxKey:["extend_notice_duetime","extend_prohibition"],
        }
    },
    methods:{
        change:handleSingle,
    },
    created(){
        handlePadding(this);
    },
};

const vm = {
    custom:true,
    vm:options,
    template:template,
    label:"请求内容",
}
export {vm}
