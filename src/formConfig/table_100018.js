// 撤回优先权声明
let rule = [
    {
        type: "input", title: "申请号", field: "patent_number", value: "",
    },
    {
        type: "input", title: "申请日", field: "patent_apd", value: "",
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "select", title: "申请人", field: "applicants", value: "", request: true, url: "",
    },
    {
        type: "select", title: "代理机构", field: "agency", value: "", request: true, url: "",
    },
    // TODO 少两个自定义组件，原form报错
]

const content = {
    rule    // rule字段名称不能更改
}

export default content