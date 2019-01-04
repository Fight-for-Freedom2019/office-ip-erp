// 声明
let count = 0;
const uniqueId = () => ++count;
import TinymceEditor from '@tinymce/tinymce-vue';
import Tinymce from "@/mixins/tinymce"
function vm(field = 'pronounce', label = '陈述意见') {
    const template = `<tinymce-editor v-model="extendData.${field}"></tinymce-editor>`;
    const options = {
        mixins:[Tinymce],
        data: {
            extendData: {
                [field]: "",
            },
        },
        components:{
            TinymceEditor,
        }
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
