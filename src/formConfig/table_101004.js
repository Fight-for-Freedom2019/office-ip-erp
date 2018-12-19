// 无效宣告案件加快审查请求书（不公开）
let rule = [
    {
        type: "input", title: "专利号", field: "patent_number", value: "",
        col: {
            span: 12,
        }
    },
    {
        type: "input", title: "案件编号", field: "board_number", value: "",
        col: {
            span: 12,
        }
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "input", title: "加快审查请求人", field: "applicants", value: "",
    },
    {
        // TODO url要设置
        type: "select", title: "联系人", field: "contact", value: "", request: true,
        url: "",
    },
    {
        // TODO url要设置
        type: "select", title: "代理机构", field: "agency", value: "", request: true,
        url: "",
    },
    {
        type: "input", title: "通知书编号", field: "notice_number", value: "",
    },
    {
        type: "input", title: "加快审查理由", field: "reason", value: "",
        props: {
            type: "textarea"
        }
    },
    {
        type: "select", title: "附件", field: "attachments", value: [],
        props:{
            multiple: true,
            filterable: true,
        },
        options: [{value: 1, label: '专利代理委托书'}, {value: 2, label: '其它附件'}]
    },
]

const content = {
    rule
}

export default content