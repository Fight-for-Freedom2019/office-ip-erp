// 实用新型专利请求书
import {vm as statement} from '../formTemplate/statement'
import {vm as priority} from '../formTemplate/priority'
import {handleSingle} from "./handle/handle";
import {vm as checkbox_vm} from "../formTemplate/checkbox";

let rule = [
    {
        type: "input", title: "发明名称", field: "title", value: "",
    },
    {
        type: "select", title: "发明人", field: "inventors", value: [],
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
    checkbox_vm("poa_declaration","声明已经与申请人签订了专利代理委托书且本表中的信息与委托书中相应信息一致",{labelWidth:"120px"},"代理声明"),
    {
        type: "input", title: "总委托书编号", field: "poa", value: "",
        attrs:{
            placeholder:"请输入总委托书编号（如果有）"
        }
    },
    priority,
    {
        type: "input", title: "权利要求项数", field: "claims_count", value: "",
    },
    {
        type: "input", title: "摘要附图图号", field: "abstract_figure", value: "",
    },
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
    {
        type: "checkbox",title: "遗传资源",field: "inheritance",value: "",
        options: [
            {value: 1, label: '本专利申请涉及的发明创造是依赖于遗传资源完成的'},
        ],
    },
    {
        type: "checkbox",title: "同日申请",field: "is_utility",value: "",
        options: [
            {value: 1, label: '声明本申请人对同样的发明创造在申请本发明专利的同日申请了发明新型专利'},
        ],
    },
    {
        type: 'checkbox', title: '不丧失新颖性声明', field: 'novelty_claims', value: [],
        options: [
            {value: "novelty_exception_exhibition", label: '已在中国政府主办或承认的国际展览会上首次展出'},
            {value: "novelty_exception_published", label: '已在规定的学术会议或技术会议上首次发表'},
            {value: "novelty_exception_leakage", label: '他人未经申请人同意而泄露其内容'}
        ],
        event: {
            change: handleSingle,
        },
    },
    {
        type: "checkbox",title: "保密审查",field: "confidential_exam",value: "",
        options: [
            {value: 1, label: '向国外申请专利保密审查请求'},
        ],
    },
    {
        type: "select", title: "附件", field: "attachments", value: []
    },
]

const content = {
    rule
}

export default content