// 陈述事项
import {handlePadding, handleSingle} from '../formConfig/handle/handle'

function vm(label) {
    const template = `
        <div class="custom-checkbox">
            <div style="display: block"><el-checkbox style="display: initial;" @change="change('notice')" v-model="extendData.notice"></el-checkbox>针对国家知识产权局于<el-date-picker style="width: auto;" value-format="yyyy-MM-dd" placeholder="请输入通知书日期" v-model="extendData.notice_date"></el-date-picker>发出的<el-input style="width: auto;" v-model="extendData.notice_name" placeholder="请输入通知书名称"></el-input>（发文序号<el-input style="width: auto;" placeholder="请输入发文序列号" v-model="extendData.notice_serial"></el-input>）陈述意见</div>
            <div style="display: block"><el-checkbox style="display: initial;" @change="change('notice_supplemental')" v-model="extendData.notice_supplemental"></el-checkbox>针对国家知识产权局于<el-date-picker style="width: auto;" value-format="yyyy-MM-dd" placeholder="请输入通知书日期" v-model="extendData.notice_date_supplemental"></el-date-picker>发出的<el-input style="width: auto;" v-model="extendData.notice_name_supplemental" placeholder="请输入通知书名称"></el-input>（发文序号<el-input style="width: auto;" placeholder="请输入发文序列号" v-model="extendData.notice_serial_supplemental"></el-input>）补充陈述意见</div>
            <div style="display: block"><el-checkbox style="display: initial;" @change="change('active_amendment')" v-model="extendData.active_amendment"></el-checkbox>主动提出修改（根据专利法实话细则第51条第1、2款的规定）</div>
            <div style="display: block"><el-checkbox style="display: initial;" @change="change('reply_to_other')" v-model="extendData.reply_to_other"></el-checkbox>其他事宜</div>
        </div>
    `;
    const options = {
        data: {
            extendData: {
                notice: false,
                notice_supplemental: false,
                active_amendment: false,
                reply_to_other: false,
                notice_date: "",
                notice_date_supplemental: "",
                notice_name: "",
                notice_name_supplemental: "",
                notice_serial: "",
                notice_serial_supplemental: "",

            },
            checked: "",
            checkboxKey: ["notice", "notice_supplemental", "active_amendment", "reply_to_other"],
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
        label: label,
        field: "__sm",
    };
}

export {vm}