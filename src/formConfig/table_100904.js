// 复审无效宣告程序补正书
import {vm as offset_content} from '../formTemplate/offset-content'
import {vm as offset_reason} from '../formTemplate/offset-reason-100904'
import {vm as checkbox_common_vm} from '../formTemplate/checkbox-common'

const correction = {
    reexam_applicant:"复审请求人",
    patentee:"专利权人",
    invalid_applicant:"无效宣告请求人",
}
let rule = [
    {
        type: "input", title: "申请号或专利号", field: "patent_number", value: "",
        col:{
            span:12,

        },
    },
    {
        type: "input", title: "案件编号", field: "board_number", value: "",
        col:{
            span:12
        }
    },
    {
        type: "input", title: "发明创造名称", field: "title", value: "",
    },
    checkbox_common_vm(correction,"补正人","",{labelWidth:"120px"},false),
    {
        type: "input", title: "", field: "applicant", value: "",
        attrs:{
            placeholder:"请输入补正人名称"
        },
        col:{
            span:14
        }
    },
    {
        type: "input", title: "电话", field: "applicant_telephone", value: "",
        attrs:{
            placeholder:"请输入补正人电话"
        },
        col:{
            span:10
        }
    },
    {
        type: "select", title: "代理机构", field: "agency", value: "",request: true, url: "",
    },
    {
        type: "select", title: "代理人", field: "agents", value: []
    },
    offset_reason,
    {
        type: "select", title: "附件", field: "attachment", value: [],
        props: {
            multiple: true,
            filterable: true,
        },
        options: [],
    },
    offset_content,
];
const content = {
    rule,
};
export default content
