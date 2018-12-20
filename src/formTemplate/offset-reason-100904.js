import {handlePadding, handleSingle} from '../formConfig/handle/handle'

const template = `
<div class="custom-checkbox">
    <el-checkbox @change="change('amendment_reason_article60')" v-model="extendData.amendment_reason_article60" label="amendment_reason_article60">
        <span>根据专利法实施细则第60条第3款的规定</span>
    </el-checkbox>
    <el-checkbox @change="change('tab100904amendment_reason_article66')" v-model="extendData.tab100904amendment_reason_article66" label="tab100904amendment_reason_article66">
        <span>根据专利法实施细则第66条第4款的规定</span>
    </el-checkbox>
    <el-checkbox @change="change('amendment_reason_notice')" v-model="extendData.amendment_reason_notice" label="amendment_reason_notice">
        <span>针对</span>
        <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="extendData.notice_date" placeholder="请输入通知书日期"></el-date-picker>
        <span>日发出的</span>
        <el-input v-model="extendData.notice_name" placeholder="请输入通知书名称"></el-input>
        <span>（发文序号</span>
        <el-input v-model="extendData.notice_serial" placeholder="请输入发文序列号"></el-input>
        <span>）进行补正</span>
    </el-checkbox>
</div>
`;

const options = {
    data: {
        extendData: {
            amendment_reason_article60: false,
            tab100904amendment_reason_article66: false,
            amendment_reason_notice: false,
            notice_serial: "",
            notice_name: "",
            notice_date: "",
        },
        checked: "",
        checkboxKey: ["amendment_reason_article60", "tab100904amendment_reason_article66", "amendment_reason_notice"],
    },
    methods: {
        change: handleSingle,
    },
    created() {
        handlePadding(this);
    },
};

const vm = {
    custom: true,
    vm: options,
    template: template,
    label: "补正原因",
    field: "offset_reason_vm",
}

export {vm}