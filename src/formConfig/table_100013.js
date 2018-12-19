//  撤回专利申请声明
import {vm as upload_vm} from "../formTemplate/Upload";

let rule = [
    {
        type: "input", title: "申请号", field: "patent_number", value: "",
    },
    {
        type: "input", title: "申请日", field: "patent_apd", value: "",
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "select", title: "申请人", field: "applicants", value: "", request: true, url: "",
    },
    {
        type: "select", title: "代理机构", field: "agency", value: "", request: true, url: "",
    },
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
    upload_vm({type:"file",tip:"上传同意撤回证明",label:"证明"})

]

const content = {
    rule
}

export default content