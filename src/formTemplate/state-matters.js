// 陈述事项
function vm(label) {
    const template = `
        <div class="custom-checkbox">
            <el-checkbox v-model="extendData.reply_notice">针对专利复审委员会于<el-input placeholder="请输入通知书日期" v-model="extendData.notice_date"></el-input>发出的<el-input v-model="extendData.notice_name" placeholder="请输入通知书名称"></el-input>（发文序号<el-input placeholder="请输入发文序列号" v-model="extendData.notice_serial"></el-input>）陈述意见</el-checkbox>
            <el-checkbox v-model="extendData.supplemental_opinion">针对<el-input placeholder="请输入提出日期" v-model="extendData.supplemental_date"></el-input>提出的（<el-checkbox v-model="extendData.supplemental_reexam">复审请求</el-checkbox>/<el-checkbox v-model="extendData.supplemental_invalid">无效宣告请求</el-checkbox>）补充意见</el-checkbox>
        </div>
    `;
    const options = {
        data: {
            extendData: {
                reply_notice: false,
                supplemental_opinion: false,
                supplemental_reexam: false,
                supplemental_invalid: false,
                notice_date: "",
                notice_name: "",
                notice_serial: "",
                supplemental_date: "",
            },
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