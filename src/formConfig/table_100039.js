const rule = [
    {
        type: "span",
        title: "根据《关于专利电子申请的规定》（第五十七号局令）第7条的规定，请求对上述纸件申请转为专利电子申请。",
        field: "test",
        value: "",
        col: {
            labelWidth: "100%",
        },
    },
    {
        type: "input", title: "申请号", field: "patent_number", value: "",
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "select", title: "申请人/权利人", field: "applicants", value: [],
    },
    {
        type: "select", title: "代理机构", field: "agency", value: []
    },
    {
        type: "select", title: "附件", field: "attachments", value: [],
        options: [
            {value:{id:1,name:"其它附件"},label:'其它附件'},
        ],
        props:{
            multiple: true,
            filterable: true,
            "value-key":"id",
        },
    },
];
const content = {
    rule,
};
export default content
