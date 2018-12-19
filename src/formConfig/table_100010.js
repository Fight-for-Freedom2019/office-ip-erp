// 恢复权利请求书
import {vm as content_vm} from '../formTemplate/request-content-common'
let rule = [
    {
        type: "input", title: "申请号", field: "patent_number", value: "",
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "input", title: "申请人/权利人", field: "applicants", value: "",
    },
    {
        type: "select", title: "代理机构", field: "agency", value: "",request: true, url: "",
    },
    content_vm('100010'),
    {
        type: 'checkbox', title: '请求恢复权利的理由', field: 'novelty_claims', value: [],
        options: [
            {value: "right_reason", label: '正当理由'},
            {value: "reason_irresistible", label: '不可抗拒事由'},
        ],
    },
    {
        type: "input", title: "", field: "opinion", value: "",
        props:{
            type:"textarea",
        },
        attrs:{
            placeholder:"输入恢复权利请求理由"
        }
    },
    {
        type: "span", title: "", field: "placeholder", value: "",
        col:{
            span:4
        }
    },
    {
        type: "select", title: "附件", field: "attachments", value: "", request: true, url: "",
        col:{
            span:20
        }
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
]
const content = {
    rule
}

export default content
