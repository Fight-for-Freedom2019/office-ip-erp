// 声明
let count = 0;
const uniqueId = () => ++count;
import VueNeditorWrap from 'vue-neditor-wrap'
function vm(field = 'pronounce', label = '陈述意见') {
    const template = `<vue-neditor-wrap v-model="extendData.${field}"></vue-neditor-wrap>`;
    const options = {
        data: {
            extendData: {
                [field]: "",
            },
        },
        components:{VueNeditorWrap}
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "__tmp" + uniqueId(),
    }
}

export {vm}
