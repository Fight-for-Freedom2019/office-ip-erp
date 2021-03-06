import {vm as statement_content_vm} from '../formTemplate/statement-content'
import {vm as upload_vm} from "../formTemplate/Upload";
import {vm as date_common_vm} from "../formTemplate/date_common";

let rule = [
    {
        type: "input", title: "专利号", field: "patent_number", value: "",
        props: {
            "type": "text",
        },
    },
    date_common_vm({field: "patent_apd", label: "申请日"}),
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
        props: {
            "type": "text",
        },
    },
    {
        type: "select", title: "代理机构", field: "agency", value: [],
        props: {
            multiple: true,
            filterable: true,
        },
    },
    {
        type: "select", title: "附件", field: "attachments", value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        options:[{value:1,label:'全体专利权同意放弃专利权的证明'},{value:2,label:'其它附件'}]
    },
    {
        type: "span", title: "备案", field: "records", value: "",
        col:{
            span:4
        }
    },
    {
        type: "input", title: "备案文件名称", field: "filename", value: "",
        col:{
            span:10
        }
    },
    {
        type: "input", title: "备案文件编号", field: "fileno", value: "",
        col:{
            span:10
        },
        class:"label-padding"
    },
    statement_content_vm("声明内容"),
    upload_vm({label:"证明",url:"/url",tip:"上传同意放弃证明",type:"custom",common:true,accept:".jpg",field:"picture",limit:1}),
];

const content = {
    rule,
}
export default content
