import {vm as quill_editor_vm} from '../formTemplate/quill-editor'
let rule = [
    {
        type: "input", title: "专利号", field: "patent_number", value: "",
        props: {
            "type": "text",
        },
    },
    {
        type: "input", title: "申请日", field: "application_day", value: "",
        props: {
            "type": "text",
        },
    },
    {
        type: "input", title: "发明创造名称", field: "inventor", value: "",
        props: {
            "type": "text",
        },
    },
    {
        type: "select", title: "申请人", field: "application", value: "",
        props: {
            multiple: true,
            filterable: true,
        },
        options: [
            {"value": 104, "label": "权利要求书"},
            {"value": 105, "label": "说明书"},
            {"value": 106, "label": "说明书附图"},
        ],
    },
    quill_editor_vm()
];

const content = {
    rule,
}
export default content
