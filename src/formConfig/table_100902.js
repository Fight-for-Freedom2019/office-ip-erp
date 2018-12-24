// 复审无效宣告程序意见陈述书
import {checkboxFunc, handleSingle} from "./handle/handle";
import {vm as state_matters_vm} from '../formTemplate/state-matters'
import {vm as checkbox_common_vm} from "../formTemplate/checkbox-common";
const opinionator = {
    applicant_reexam:"复审请求人",
    applicant_patentee:"专利权人",
    applicant_invalid:"无效宣告请求人",
}
let rule = [
    {
        type:"input",title: "申请/专利号",field: "patent_number",value: "",
    },
    {
        type:"input",title: "发明创造名称",field: "title",value: "",
    },
    {
        type:"input",title: "复审委案件编号",field: "board_number",value: "",
    },
    checkbox_common_vm(opinionator,"意见陈述人",checkboxFunc,{labelWidth:"120px"},false),
    {
        type:"input",title: "",field: "applicant_name",value: "",
        col:{
            span:14
        },
        attrs:{
            placeholder:"请输入意见陈述人名称"
        }
    },
    {
        type:"input",title: "",field: "applicant_telephone",value: "",
        col:{
            span:10,
            labelWidth:"0px"
        },
        attrs:{
            placeholder:"请输入意见陈述人电话"
        }
    },
    {
        type: "select", title: "代理机构", field: "agency", value: "", request: true, url: "",
    },
    {
        type: "select", title: "代理人", field: "agents", value: []
    },
    state_matters_vm("陈述事项"),
    {
        type: "select", title: "附件", field: "attachments", value: []
    },

]
const content = {
    rule
}

export default content