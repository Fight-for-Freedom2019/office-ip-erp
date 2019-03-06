// 中止程序请求书
let rule = [
    {
        type: "span",
        title: "根据专利法实施细则第86条的规定，请求中止下述专利申请或者专利的程序。",
        field: "placeholder",
        col: {
            labelWidth:"100%",
        },
    },
    {
        type: "input", title: "申请号", field: "patent_number", value: "",
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "select", title: "第一署名申请人或专利权人", field: "first_applicant", value: [],
    },
    {
        type: "select", title: "请求人", field: "applicants", value: []
    },
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
        type: "select", title: "附件", field: "attachments", value: []
    },
]

const content = {
    rule
}

export default content