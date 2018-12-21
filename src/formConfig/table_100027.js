// 向外国申请专利保密审查请求书
let rule = [
    {
        type: "span",
        title: "根据专利法第20第第1款的规定，拟就在中国完成的发明或实用新型向外国申请专利，请求进行保密审查。",
        field: "placeholder1",
        col: {
            labelWidth:"100%",
        },
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "span",
        title: "专利申请（与申请同时递交或已经递交CN申请时填写）",
        field: "placeholder2",
        col: {
            labelWidth:"100%",
        },
    },
    {
        type: "input", title: "申请人", field: "applicant", value: "",
        attrs:{
            placeholder:"应当填写第一署名申请人"
        },
    },
    {
        type: "input", title: "申请号", field: "apn", value: "",
    },
    {
        type: "span",
        title: "直接向外国申请（未提交CN申请时填写此项）",
        field: "placeholder3",
        col: {
            labelWidth:"100%",
        },
    },
    {
        type: "select", title: "请求人", field: "applicants", value: []
    },
    {
        type: "select", title: "发明人", field: "inventors", value: []
    },
    {
        type: "select", title: "收件人", field: "contact", value: [],
    },
    {
        type: "select", title: "代理机构", field: "agency", value: "",request: true, url: "",
    },
    {
        type: "select", title: "代理人", field: "agents", value: []
    },
    {
        type: "select", title: "附件", field: "attachments", value: "",request: true, url: "",
    },
]

const content = {
    rule
}

export default content