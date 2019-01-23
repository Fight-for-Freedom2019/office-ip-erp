// 外观设计专利请求书
import {vm as statement} from '../formTemplate/statement'
import {vm as priority} from "../formTemplate/priority";
import {vm as design} from '../formTemplate/design'
import {handleSingle} from "./handle/handle";
import {vm as checkbox_common_vm} from "../formTemplate/checkbox-common";
const novelty_claims = {
    novelty_exception_exhibition:"已在中国政府主办或承认的国际展览会上首次展出",
    novelty_exception_published:"已在规定的学术会议或技术会议上首次发表",
    novelty_exception_leakage:"他人未经申请人同意而泄露其内容",
}
let rule = [
    {
        type: "input",title: "外观设计名称",field: "title",value: "",
    },
    {
        type: "select", title: "设计人", field: "inventors", value: [],
    },
    {
        type: "select", title: "申请人", field: "applicants", value: []
    },
    statement,
    {
        type: "select", title: "联系人", field: "contact", value: [],
    },
    {
        type: "select", title: "代理机构", field: "agency", value: []
    },
    {
        type: "select", title: "代理人", field: "agents", value: []
    },
    {
        type: "input", title: "总委托书编号", field: "poa", value: "",
        attrs:{
            placeholder:"请输入总委托书编号（如果有）"
        }
    },
    priority,
    {
        type: "input", title: "分案申请", field: "division_number", value: "",
        attrs:{
            placeholder:"请输入原申请号",
        },
        col:{
            span:10
        }
    },
    {
        type: "input", title: "", field: "division_division_number", value: "",
        col:{
            span:7,
            labelWidth:"0px"
        },
        attrs:{
            placeholder:"针对的分案申请号",
        },
    },
    {
        type: "input", title: "", field: "division_apd", value: "",
        col:{
            span:7,
            labelWidth:"0px"
        },
        attrs:{
            placeholder:"请输入原申请日",
        },
    },
    design("相似设计","similar"),
    design("成套设计","set"),
    checkbox_common_vm(novelty_claims,"不丧失新颖性声明","",{labelWidth:"120px"}),
    {
        type: "select", title: "附件", field: "attachments", value: []
    },
]

const content = {
    rule
}

export default content