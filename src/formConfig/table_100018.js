// 撤回优先权声明
import {vm as remove_priority_vm} from '../formTemplate/remove-priority'
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
        type: "select", title: "申请人", field: "applicants", value:[]
    },
    {
        type: "select", title: "代理机构", field: "agency", value: "", request: true, url: "",
    },
    remove_priority_vm(),
    upload_vm({label:"全体申请人同意撤回优先权的证明",url:"/url",field:"picture"}),
    // TODO 原form报错
]

const content = {
    rule    // rule字段名称不能更改
}

export default content