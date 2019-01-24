// 声明
let count = 0;
const uniqueId = () => ++count;
import TinymceEditor from '@tinymce/tinymce-vue';
import Tinymce from "@/mixins/tinymce"
function vm(field = 'pronounce', label = '陈述意见') {
    // const template = `<tinymce-editor v-model="extendData.${field}" :api-key="api_key" :init="editorInit"></tinymce-editor>`;
    const template = `<el-input type="textarea" v-model="extendData.${field}"></el-input>`;
    const options = {
        mixins:[Tinymce],
        data: {
            extendData: {
                [field]: "",
            },
        },
        components:{
            TinymceEditor,
        },
      created(){
          console.log("this",this);
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
