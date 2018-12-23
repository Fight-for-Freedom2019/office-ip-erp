// 优先权文件数字接入服务（DAS）请求书
import {vm as checkbox_common_vm} from "../formTemplate/checkbox-common";
import {vm as remove_priority_vm} from "../formTemplate/remove-priority";

const DAS = {
    DAS_save:"请求使用DAS将本申请电子形式的文件副本作为在先申请文件副本存入国家知识产权局DAS文件数字图书馆，并在适当时候向参与服务的其它专利局传送该文件副本。",
    DAS_query:"查询请求："
}
let rule = [
    {
        type: "input",title: "申请号", field: "patent_number",value: "",
    },
    {
        type: "select",title: "请求人姓名或名称", field: "applicants",value: []
    },
    {
        type: "input",title: "请求人电子邮箱", field: "email",value: "",
    },
    {
        type: "input",title: "请求人联系电话", field: "telephone",value: "",
    },
    {
        type: "span",
        title: "根据专利法实施细则第31条第1款或专利合作条约实施细则第17条的规定，向国家知识产权局（以下项目二选一）提出：",
        field: "placeholder",
        col: {
            labelWidth:"100%",
        },
        class:"font-bold"
    },
    checkbox_common_vm(DAS,""),
    remove_priority_vm(true),
]

const content = {
    rule
}

export default content