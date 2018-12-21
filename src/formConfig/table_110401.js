// 实质审查请求书
import {vm as substantive_review_vm} from '../formTemplate/substantive-review'

let rule = [
    {
        type: "span",
        title: "根据专利法第35条的规定，请求对以下专利申请进行实质审查",
        field: "placeholder",
        col: {
            labelWidth: "100%",
        },
    },
    {
        type: "input", title: "申请号", field: "patent_number", value: "",
    },
    {
        type: "input", title: "发明名称", field: "title", value: "",
    },
    {
        type: "select", title: "申请人", field: "applicants", value: [],
        attrs: {
            placeholder: "应当填写第一署名申请人"
        }
    },
    {
        type: "checkbox", title: "申请人声明", field: "disclaim_amendment", value: "",
        options: [
            {value: 1, label: '放弃专利法实施细则第51条规定的主动修改的权利'},
        ],
    },
    {
        type: "select", title: "附件清单", field: "attachments", value: [],
        options: [{value: 1, label: '申请文件替换文件'}, {value: 2, label: '申请日前与本发明有关的参考资料'}, {value: 3, label: '外国对该申请检索到的资料'}, {
            value: 4,
            label: '外国对该申请审查结果的资料'
        }, {value: 5, label: '其它附件'}],
        props: {
            multiple: true,
            filterable: true,
        },
        attrs: {
            placeholder: "请选择必要的附件"
        }
    },
    substantive_review_vm(),
]

const content = {
    rule
}

export default content