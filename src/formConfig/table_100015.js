// 更正错误请求书
import {vm as correction_content_vm} from '../formTemplate/correction-content'

let rule = [
    {
        type: "input", title: "申请号", field: "patent_number", value: "",
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "select", title: "申请人/权利人", field: "applicants", value: []
    },
    {
        type: "select", title: "代理机构", field: "agency", value: []
    },
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
    correction_content_vm(),
]

const content = {
    rule
}

export default content
