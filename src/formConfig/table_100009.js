// 延长期限请求书
import {vm as request_content} from '../formTemplate/request-content'
let rule = [
    request_content,
    {
        type: "input", title: "请求延长的期限", field: "duetime_type", value: "",
        props: {
            "type": "text",
        },
    },
    {
        type: "DatePicker", title: "期限截止日期", field: "duetime_date", value: "",
        props: {
            "type": "date",
        },
    },
    {
        type: "input", title: "请求延长的时间(以月计算)", field: "duetime_period", value: "",
        props: {
            "type": "text",
        },
    },
    {
        type: "input", title: "请求延长期限的理由", field: "opinion", value: "",
        props: {
            "type": "textarea",
            rows:4
        },
    },
    // TODO 附件要改
    {
        type: "select", title: "附件（非必填）", field: "attachments", value: [],
        props: {
            multiple: true,
            filterable: true,
        },
    },
];
const content = {
    rule,
};
export default content