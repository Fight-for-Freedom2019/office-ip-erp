// 标准CheckBox
let count = 0;
const uniqueId = () => ++count;

function vm(field, label, col = {}, formItemLabel = "") {
    const template = `<el-checkbox v-model="extendData.${field}">${label}</el-checkbox>`;
    const options = {
        data: {
            extendData: {
                [field]: false,
            },
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: formItemLabel,
        field: "__tmp" + uniqueId(),
        col: col,
    }
}

export {vm}
