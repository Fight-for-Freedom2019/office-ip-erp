// 发明专利请求提前公布声明
let rule = [
    {
        type: "span",
        title: "根据专利法第34条的规定，请求早日公布下列发明专利申请",
        field: "placeholder",
        col: {
            labelWidth:"100%",
        },
    },
    {
        type: 'input', title: '申请号', field: 'patent_number', value: '',
    },
    {
        type: 'input', title: '发明创造名称', field: 'title', value: '',
    },
    {
        type:"select",title:"申请人",field:"applicants",value:[]
    },
]

const content = {
    rule
}

export default content
