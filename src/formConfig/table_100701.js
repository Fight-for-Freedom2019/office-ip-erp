// 专利权评价报告请求书
import {vm as patent_type_vm} from '../formTemplate/patent-type'
import {vm as applicant_vm} from '../formTemplate/applicant'
import {vm as evaluate_targeted_vm} from '../formTemplate/evaluate-targeted'

let rule = [
    {
        type: "span",
        title: "根据专利法第61条及其实施细则第56条的规定，请求对以下专利权作出专利权评价报告。",
        field: "placeholder",
        col: {
            labelWidth:"100%",
        },
    },
    {
        type: "input", title: "专利号", field: "patent_number", value: "",
    },
    {
        type: "input", title: "专利权人", field: "patentee", value: "",
    },
    patent_type_vm("专利类型"),
    applicant_vm("请求人"),
    {
        type: "select", title: "联系人", field: "contact", value: [],
    },
    {
        type: "select", title: "代理机构", field: "agency", value: []
    },
    {
        type: "select", title: "代理人", field: "agents", value: []
    },
    evaluate_targeted_vm("评价所针对的文本"),
    {
        type: "select", title: "附件", field: "attachments", value: []
    },
]
const content = {
    rule
}

export default content