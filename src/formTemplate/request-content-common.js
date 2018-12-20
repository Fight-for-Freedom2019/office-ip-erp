// 请求内容
// TODO 样式要改
let count = 0;
const uniqueId = () => ++count;

function vm(type) {
    const template = `
        <div>
            <template v-if="type === '100905'">
                <span>根据专利法实施细则第6条第1款或第2款的规定，针对国家知识产权局于</span>
            </template>
            <template v-if="type === '100010'">
                <span>根据专利法实施细则第6条的规定，针对</span>
            </template>
            <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="extendData.notice_date" placeholder="请输入通知书日期"></el-date-picker>
            <span>日发出的</span>
            <el-input v-model="extendData.notice_name" placeholder="请输入通知书名称"></el-input>
            <span>（发文序号</span>
            <el-input v-model="extendData.notice_serial" placeholder="请输入发文序列号"></el-input>
            <span>）请求恢复权利</span>
        </div>
`;
    const options = {
        data: {
            extendData: {
                notice_date: "",
                notice_serial: "",
                notice_name: "",
            },
            type: type,
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: '请求内容',
        field: "__tmp" + uniqueId(),
    }
}

export {vm}