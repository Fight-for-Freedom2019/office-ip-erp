// 外观设计专利请求书
import {vm as statement} from '../formTemplate/statement'
import {vm as priority} from "../formTemplate/priority";
import {vm as design} from '../formTemplate/design'
import {handleSingle} from "./handle/handle";

let rule = [
    {
        type: "input",title: "外观设计名称",field: "title",value: "",
    },
    {
        type: "select", title: "设计人", field: "inventors", value: "", request: true, url: "",
    },
    {
        type: "select", title: "申请人", field: "applicants", value: "", request: true, url: "",
    },
    statement,
    {
        type: "select", title: "联系人", field: "contact", value: [], request: true, url: "/contacts",DATA_KEY:"data",
        props: {
            multiple: true,
            filterable: true,
        },
    },
    {
        type: "select", title: "代理机构", field: "agency", value: "", request: true, url: "",
    },
    {
        type: "select", title: "代理人", field: "agents", value: "", request: true, url: "",
    },
    {
        type: "select", title: "总委托书编号", field: "poa", value: "", request: true, url: "",
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
        type: "select", title: "附件", field: "attachments", value: "", request: true, url: "",
    },
]

const content = {
    rule
}

export default content