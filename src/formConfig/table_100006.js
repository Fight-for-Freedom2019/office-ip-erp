import {vm as offset_content} from '../formTemplate/offset-content'
import {vm as offset_reason} from '../formTemplate/offset-reason'

let rule = [
    {
        type: "input", title: "申请号", field: "patent_number", value: "",
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    {
        type: "select", title: "申请人", field: "applicants", value: [],
        props: {
            multiple: true,
            filterable: true,
        },
    },
    {
        type: "select", title: "代理机构", field: "agency", value: [],
        props: {
            multiple: true,
            filterable: true,
        },
    },
    offset_reason,
    offset_content,
    {
        type: "select", title: "附件（非必填）", field: "attachments", value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        options: [],
    },
    {
        type: "span", title: "备案", field: "records", value: "",
        props: {
            "type": "text",
        },
        col:{
            span:4
        }
    },
    {
        type: "input", title: "备案文件名称", field: "filename", value: "",
        props: {
            "type": "text",
        },
        col:{
            span:10
        }
    },
    {
        type: "input", title: "备案文件编号", field: "fileno", value: "",
        props: {
            "type": "text",
        },
        col:{
            span:10
        }
    },

];
const content = {
    rule,
};
export default content