// 声明
let count = 0;
const uniqueId = () => ++count;
// import TinymceEditor from '@tinymce/tinymce-vue';
// import Tinymce from "@/mixins/tinymce"
import { quillEditor } from 'vue-quill-editor'
// import CpcTinymce from './formComponents/CpcTinymce'
function vm(field = 'pronounce', label = '陈述意见') {
    // const template = `<div><tinymce-editor v-model="extendData.${field}" :api-key="api_key" :init="editorInit"></tinymce-editor></div>`;
    // const template = `<el-input type="textarea" v-model="extendData.${field}"></el-input>`;
    const template = `<quill-editor v-model="extendData.${field}"></quill-editor>`;
    const options = {
        // mixins:[Tinymce],
        data: {
            extendData: {
                [field]: "",
            },
        },
        components:{
            // TinymceEditor,
        },
    };
    return {
        custom: true,
        vm: options,
        template: template,
        label: label,
        field: "tinymce",
    }
}

export {vm}
