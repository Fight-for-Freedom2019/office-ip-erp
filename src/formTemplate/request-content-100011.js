// 请求内容
import {handleSingle, handlePadding} from "../formConfig/handle/handle";

let count = 0;
const uniqueId = () => ++count;

function vm() {
    const template = `
        <div class="custom-checkbox custom-component">
            <el-checkbox v-model="extendData.fee_invoice" label="fee_invoice" @change="change('fee_invoice')">请求转换费用种类</el-checkbox>
            <el-checkbox v-model="extendData.fee_invoice_unreceived" label="fee_invoice_unreceived" @change="change('fee_invoice_unreceived')">缴纳专利费两个月后尚未收到国家知识产权局开出的费用收据</el-checkbox>
            <el-checkbox v-model="extendData.fee_notice" label="fee_notice" @change="change('fee_notice')">
                <span>针对国家知识产权局于</span>
                <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="extendData.notice_date" placeholder="请输入通知书日期"></el-date-picker>
                <span>日发出的</span>
                <el-input v-model="extendData.notice_name" placeholder="请输入通知书名称"></el-input>
                <span>（发文序号</span>
                <el-input v-model="extendData.notice_serial" placeholder="请输入发文序列号"></el-input>
                <span>）请求恢复权利</span>
            </el-checkbox>
        </div>
`;
    const options = {
        data: {
            extendData: {
                fee_invoice: false,
                fee_invoice_unreceived: true,
                fee_notice: false,
                notice_date: "",
                notice_serial: "",
                notice_name: "",
            },
            checked: "",
            checkboxKey: ["fee_invoice", "fee_invoice_unreceived", "fee_notice"],
        },
        methods: {
            change: handleSingle
        },
        created() {
            handlePadding(this);
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: "",
        field: "__tmp" + uniqueId(),
        col: {
            labelWidth: "1px"
        }
    }
}

export {vm}