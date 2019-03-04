import {handlePadding, handleSingle} from '../formConfig/handle/handle'

const template = `
<div class="custom-checkbox custom-component">
    <div style="display: block"><el-checkbox style="display: initial;" @change="change('amendment_active')" v-model="extendData.amendment_active"></el-checkbox>根据专利法实施细则第51条的规定，提出主动修改</div>
    <div style="display: block"><el-checkbox style="display: initial;" @change="change('amendment_notice')" v-model="extendData.amendment_notice">
        
    </el-checkbox>
    <span>针对</span>
        <el-date-picker style="width: auto;" type="date" value-format="yyyy-MM-dd" v-model="extendData.notice_date" placeholder="请输入通知书日期"></el-date-picker>
        <span>日发出的</span>
        <el-input style="width: auto;" v-model="extendData.notice_name" placeholder="请输入通知书名称"></el-input>
        <span>（发文序号</span>
        <el-input style="width: auto;" v-model="extendData.notice_serial" placeholder="请输入发文序列号"></el-input>
        <span>）进行补正</span></div>
    
</div>
`;

const options = {
    data: {
        extendData: {
            amendment_active: false,
            amendment_notice: false,
            notice_name: "",
            notice_date: "",
            notice_serial: "",
        },
        checked: "",
        checkboxKey: ["amendment_active", "amendment_notice"],
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
