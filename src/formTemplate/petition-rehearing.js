// 复审请求书
function vm() {
    const template = `
        <div>
            根据专利法第41条第1款及专利法实施细则第60条第1款的规定，对国家知识产权局于<el-date-picker style="width: auto;" value-format="yyyy-MM-dd" placeholder="请输入通知书日期" v-model="extendData.notice_date"></el-date-picker>日发出的对下述专利申请的驳回决定不服，请求复审：
        </div>
    `;
    const options = {
        data: {
            extendData: {
                notice_date: "",
            },
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: "",
        field: "__et",
        col: {
            labelWidth: "0px",
        }
    };
}

export {vm}