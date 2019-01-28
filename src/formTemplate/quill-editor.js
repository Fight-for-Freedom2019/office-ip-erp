// 声明
let count = 0;
const uniqueId = () => ++count;
// import TinymceEditor from '@tinymce/tinymce-vue';
// import Tinymce from "@/mixins/tinymce"
import EditorBar from './formComponents/EditorBar'
function vm(field = 'pronounce', label = '陈述意见') {
  // const template = `<div><tinymce-editor v-model="extendData.${field}" :api-key="api_key" :init="editorInit"></tinymce-editor></div>`;
  const template = `<editor-bar v-model="extendData.${field}"></editor-bar>`;
  // const template = `<quill-editor v-model="extendData.${field}" ref="myTextEditor" @ready="onEditorReady($event)" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" :options="editorOptions"></quill-editor>`;
  const options = {
    // mixins:[Tinymce],
    data: {
      extendData: {
        [field]: "",
      },
    },
    components: {
      // TinymceEditor,
      EditorBar
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
