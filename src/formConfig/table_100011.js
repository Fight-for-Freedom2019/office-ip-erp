// 意见陈述书（关于费用）
import {vm as state_matters_vm} from '../formTemplate/state-matters-100011'
import {vm as request_content_vm} from '../formTemplate/request-content-100011'
import {vm as quill_editor_vm} from '../formTemplate/quill-editor'

//state-matters-100011
let rule = [
    {
        type: "input",title: "申请号",field: "patent_number",value: "",
    },
    {
        type: "input",title: "发明创造名称",field: "title",value: "",
    },
    {
        type: "select",title: "申请人/权利人",field: "applicants",value: []
    },
    {
        type: "select",title: "代理机构",field: "agency",value: []
    },
    {
        type: "span",
        title: "陈述事项:",
        field: "placeholder",
        col: {
            labelWidth:"100%",
        },
    },
    state_matters_vm(),
    request_content_vm(),
    {
        type: "select", title: "附件", field: "attachments", value: []
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
        },
        class:"label-padding"
    },
    quill_editor_vm("opinion","陈述意见")
]

const content = {
    rule
}

export default content