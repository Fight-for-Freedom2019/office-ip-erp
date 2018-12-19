let count = 0;
const uniqueId = () => ++count;
function vm() {
    const template = `
        <el-checkbox v-model="extendData.review_request_notice">申请人于<el-date-picker value-format="yyyy-MM-dd" v-model="extendData.review_request_notice_date"></el-date-picker>收到下列通知：</el-checkbox>
    `;
    const options = {
        data() {
            return {
                extendData: {
                    review_request_notice: false,
                    review_request_notice_date:""
                },
            }
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: "",
        field: "__rr"+uniqueId(),
        col:{
            labelWidth:"0px",
        }
    };
}
export {vm}