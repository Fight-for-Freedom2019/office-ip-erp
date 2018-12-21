// 复审程序延长期限请求书
import {vm as request_content} from '../formTemplate/request-content-100906'

//
let rule = [
    {
        type: "span",
        title: "根据专利法实施细则第6条第4款的规定，对上述专利申请的指定期限请求延长",
        field: "placeholder",
        col: {
            labelWidth: "100%",
        },
    },
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
        },
        attrs: {
            placeholder: "请输入复审委案件编号",
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
    request_content(),
    {
        type: "span",
        title: "延长期限",
        field: "placeholder1",
        col: {
            labelWidth: "100%",
            span:3
        },
    },
    {
        type: "span",
        title: "请求延长的期限",
        field: "placeholder2",
        col: {
            labelWidth: "100%",
            span:7
        },
    },
    {
        type: "span",
        title: "期限截止日期",
        field: "placeholder3",
        col: {
            labelWidth: "100%",
            span:7
        },
    },
    {
        type: "span",
        title: "请求延长的时间（以月计算）",
        field: "placeholder4",
        col: {
            labelWidth: "100%",
            span:7
        },
    },
    {
        type: "span",
        title: "",
        field: "placeholder5",
        col: {
            labelWidth: "100%",
            span:3
        },
    },
    {
        type: "input", title: "", field: "duetime_type", value: "",
        col: {
            span: 7,
            labelWidth:"0px"
        }
    },
    {
        type: "DatePicker", title: "", field: "duetime_date", value: "",
        col: {
            span: 7,
            labelWidth:"0px"
        }
    },
    {
        type: "input", title: "", field: "duetime_period", value: "",
        col: {
            span: 7,
            labelWidth:"0px"
        }
    },
    {
        type: "input", title: "期限延长理由", field: "opinion", value: "",
        props:{
            type:"textarea"
        }
    },
    {
        type: "select", title: "附件", field: "attachments", value: "", request: true, url: "",
    },
]

const content = {
    rule
}

export default content