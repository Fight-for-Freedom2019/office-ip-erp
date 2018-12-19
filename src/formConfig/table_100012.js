// 意见陈述书
import {vm as state_matters_vm} from '../formTemplate/state-matters-100012'
import {vm as quill_editor_vm} from '../formTemplate/quill-editor'
let rule = [
    {
        type: "input", title: "申请号", field: "patent_number", value: "",
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "select", title: "申请人/权利人", field: "applicants", value: "",
        options: [],
    },
    {
        type: "select", title: "代理机构", field: "agency", value: "",
        options: [],
    },
    state_matters_vm("陈述事项"),
    {
        type: "select", title: "附件", field: "attachments", value: "", request: true, url: "",
    },
    {
        type: "span", title: "备案", field: "records", value: "",
        col:{
            span:4
        }
    },
    {
        type: "input", title: "备案文件名称", field: "filename", value: "",
        col:{
            span:10
        }
    },
    {
        type: "input", title: "备案文件编号", field: "fileno", value: "",
        col:{
            span:10
        }
    },
    quill_editor_vm("opinion","陈述意见")
]

const content = {
    rule,
};
export default content