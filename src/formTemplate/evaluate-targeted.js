// 评价所针对的文本
function vm(label) {
    const template = `
        <div class="custom-checkbox">
            <el-checkbox v-model="extendData.text_issued">与授权公告一并公布的文件</el-checkbox>
            <el-checkbox v-model="extendData.text_invalid">由生效的无效宣告请求审查决定维持有效的专利文件，其中涉及第<el-input placeholder="请输入无效决定号" v-model="extendData.invalid_number"></el-input>号无效宣告请求审查决定</el-checkbox>
        </div>
    `;
    const options = {
        data() {
            return {
                extendData: {
                    text_issued: false,
                    text_invalid: false,
                    invalid_number:"",
                },
            }
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__et",
    };
}
export {vm}