// 复审程序恢复权利请求书
import {vm as content_vm} from '../formTemplate/request-content-common'

let rule = [
    {
        type: "input", title: "申请号", field: "patent_number", value: "",
        col: {
            span: 12
        }
    },
    {
        type: "input", title: "案件编号", field: "board_number", value: "",
        col: {
            span: 12
        }
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "select", title: "复审请求人", field: "applicants", value: []
    },
    {
        type: "select", title: "代理机构", field: "agency", value: "", request: true, url: "",
    },
    content_vm('100905'),
    {
        type: "input", title: "恢复理由", field: "opinion", value: "",
        props:{
            type:"textarea"
        }
    },
    {
        type: "select", title: "附件", field: "attachments", value: [],
        options:[
            {value:"1",label:"其它附件"}
        ]
    },
]

const content = {
    rule
}

export default content
