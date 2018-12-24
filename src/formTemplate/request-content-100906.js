// 请求内容
let count = 0;
const uniqueId = () => ++count;

function vm(type) {
    const template = `
        <div class="custom-checkbox custom-component">
            <el-checkbox v-model="extendData.extend_notice_duetime" @change="extend_notice">
                <span>针对国家知识产权局于</span>
                <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="extendData.notice_date" placeholder="请输入通知书日期"></el-date-picker>
                <span>日发出的</span>
                <el-input v-model="extendData.notice_name" placeholder="请输入通知书名称"></el-input>
                <span>（发文序号</span>
                <el-input v-model="extendData.notice_serial" placeholder="请输入发文序列号"></el-input>
                <span>）中指定的期限请求延长</span>
            </el-checkbox>
            <el-checkbox v-model="extendData.extend_other" @change="extend_other"><el-input placeholder="请输入延长类型" v-model="extendData.extend_other_reason"></el-input></el-checkbox>
        </div>
`;
    const options = {
        data: {
            extendData: {
                extend_notice_duetime: false,
                extend_other: false,
                notice_date: "",
                notice_serial: "",
                notice_name: "",
                extend_other_reason: "",
            },
            type: type,
        },
        methods: {
            extend_other(val) {
                val ? this.extendData.extend_notice_duetime = false : "";
            },
            extend_notice(val) {
                val ? this.extendData.extend_other = false : "";
            },
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: '请求内容',
        field: "__rc-100906" + uniqueId(),
    }
}

export {vm}