// 无效宣告请求口头审理通知书回执
import {vm as checkbox_common_vm} from '../formTemplate/checkbox-common'
import {vm as invalid_receipt_vm} from '../formTemplate/invalid-receipt'

let rule = [
    {
        type:"input",title:"专利号",field:"patent_number",value:"",
        col:{
            span:12,
        }
    },
    {
        type:"input",title:"案件编号",field:"board_number",value:"",
        col:{
            span:12,
        }
    },
    {
        type:"input",title:"发明创造名称",field:"title",value:"",
    },
    {
        type:"input",title:"专利权人",field:"patentee",value:"",
        col:{
            span:12,
        }
    },
    {
        type:"input",title:"电话",field:"patentee_telephone",value:"",
        attrs:{
            placeholder:"请输入专利权人电话"
        },
        col:{
            span:12,
        }
    },
    {
        type:"input",title:"无效宣告请求人",field:"applicant",value:"",
        col:{
            span:12,
        }
    },
    {
        type:"input",title:"电话",field:"applicant_telephone",value:"",
        attrs:{
            placeholder:"请输入无效宣告请求人电话"
        },
        col:{
            span:12,
        }
    },
    {
        // TODO url要设置
        type:"select",title:"代理机构",field:"agency",value:"",request: true,
        url: "",
    },
    checkbox_common_vm({patentee_join:"专利权人",applicant_join:"无效宣告请求人"},"是否参加","",{labelWidth:"120px"}),
    invalid_receipt_vm(),
    {
        type:"input",title:"参加人",field:"agents",value:"",
        props:{
            type:"textarea"
        },
        attrs:{
            placeholder:"参加口头审理当事人及其代理人的姓名、工作单位（或职业），并注明口头审理时的第一发言人："
        },
    },
    {
        type:"input",title:"证人",field:"witness",value:"",
        props:{
            type:"textarea"
        },
        attrs:{
            placeholder:"要求派人出庭作证，证人的姓名、身份证号、工作单位（或职业）以及要证明的事实"
        },
    },
    {
        type:"input",title:"证物",field:"evidence",value:"",
        props:{
            type:"textarea"
        },
        attrs:{
            placeholder:"需要在口头审理中演示的证物如下"
        },
    },
]

const content = {
    rule
}

export default content
