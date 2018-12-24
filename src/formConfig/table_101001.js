// 专利无效宣告请求书
import {vm as invalid_scope_vm} from '../formTemplate/invalid-scope'
let rule = [
    {
        type: "input",title: "专利号",field: "patent_number",value: "",
        col:{
            span:12
        }
    },
    {
        type: "input",title: "授权公告日",field: "issue_date",value: "",
        col:{
            span:12
        },
        class:"label-padding"
    },
    {
        type: "input",title: "发明创造名称",field: "title",value: "",
    },
    {
        type: "input",title: "专利权人",field: "patentee",value: "",
    },
    {
        type: "select",title: "无效宣告请求人",field: "applicants",value: []
    },
    {
        type: "select",title: "联系人",field: "contact",value: [],
    },
    {
        type: "select",title: "代理机构",field: "agency",value: "",request: true,
        url: "",
    },
    {
        type: "select",title: "代理人",field: "agents",value: []
    },
    {
        // TODO url要设置
        type: "select",title: "附件",field: "attachments",value: []
    },

    invalid_scope_vm,

    {
        type: "input",title: "结合证据具体陈述意见",field: "opinion",value: "",
        props:{
            type:"textarea"
        },
    },
]

const content = {
    rule
}

export default content