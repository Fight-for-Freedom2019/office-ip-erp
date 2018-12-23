// 复审请求书
import {vm as quill_editor_vm} from '../formTemplate/quill-editor'
import {vm as petition_rehearing_vm} from '../formTemplate/petition-rehearing'
let rule = [
    petition_rehearing_vm(),
    {
        type: "input", title: "申请号", field: "patent_number", value: "",
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "select", title: "复审请求人", field: "applicants", value: []
    },
    {
        type: "select", title: "联系人", field: "contact", value: [],
    },
    {
        type: "select", title: "代理机构", field: "agency", value: "",request: true,
        url: "",
    },
    {
        type: "select", title: "代理人", field: "agents", value: []
    },
    {
        // TODO url要设置
        type: "select", title: "附件", field: "attachments", value: []
    },
    quill_editor_vm("opinion","复审请求的理由")
];

const content = {
    rule,
}
export default content
