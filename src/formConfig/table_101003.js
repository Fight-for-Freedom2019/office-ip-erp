// 专利权无效宣告程序授权委托书
import {vm as upload_vm} from '../formTemplate/Upload'
import {vm as checkbox_common_vm} from '../formTemplate/checkbox-common'
const one = {
    agent_one_general:"除需要特别授权事项外的所有权限",
    agent_one_admit_request:"专利权人的代理人代为承认请求人的无效宣告请求",
    agent_one_amend_claims:"专利权人的代理人代为修改权利要求书",
    agent_one_compromise:"代理人代为和解",
    agent_one_cancel_request:"请求人的代理人代为撤回无效宣告请求",
};
const two = {
    agent_two_general:"除需要特别授权事项外的所有权限",
    agent_two_admit_request:"专利权人的代理人代为承认请求人的无效宣告请求",
    agent_two_amend_claims:"专利权人的代理人代为修改权利要求书",
    agent_two_compromise:"代理人代为和解",
    agent_two_cancel_request:"请求人的代理人代为撤回无效宣告请求",
};

function checkOneFunc(target) {
    if(target === "agent_one_cancel_request"){
        if(this.extendData.agent_one_cancel_request){
            this.extendData.agent_one_admit_request = false;
            this.extendData.agent_one_amend_claims = false;
        }
    }
    if(target === "agent_one_admit_request" || target === "agent_one_amend_claims") {
        if(this.extendData.agent_one_admit_request||this.extendData.agent_one_amend_claims) {
            this.extendData.agent_one_cancel_request = false;
        }
    }
}
function checkTwoFunc(target) {
    if(target === "agent_two_cancel_request"){
        if(this.extendData.agent_two_cancel_request){
            this.extendData.agent_two_admit_request = false;
            this.extendData.agent_two_amend_claims = false;
        }
    }
    if(target === "agent_two_admit_request" || target === "agent_two_amend_claims") {
        if(this.extendData.agent_two_admit_request||this.extendData.agent_two_amend_claims) {
            this.extendData.agent_two_cancel_request = false;
        }
    }
}
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
        type:"input",title:"无效宣告请求人",field:"applicant",value:"",
    },
    {
        type:"input",title:"专利权人",field:"patentee",value:"",
    },
    {
        type:"span",title:"委托人",field:"placeholder1",value:"",
    },
    {
        type:"input",title:"姓名或名称",field:"consigner_name",value:"",
        attrs:{
            placeholder:"请输入委托人名称"
        },
        col:{
            span:12,
        }
    },
    {
        type:"input",title:"电话",field:"consigner_telephone",value:"",
        attrs:{
            placeholder:"请输入委托人电话"
        },
        col:{
            span:12,
        }
    },
    {
        type:"input",title:"通信地址",field:"consigner_address",value:"",
        attrs:{
            placeholder:"请输入委托人联系地址"
        },
        col:{
            span:12,
        }
    },
    {
        type:"input",title:"邮编",field:"consigner_postcode",value:"",
        attrs:{
            placeholder:"请输入委托人邮编"
        },
        col:{
            span:12,
        }
    },
    {
        type:"span",title:"被委托人",field:"placeholder2",value:"",
    },
    {
        type:"select",title:"代理机构",field:"agency",value:[]
    },
    {
        type:"select",title:"代理人",field:"agents",value:[]
    },
    {
        type:"input",title:"通信地址",field:"agent_address",value:"",
    },
    {
        type:"input",title:"邮编",field:"agent_postcode",value:"",
    },
    checkbox_common_vm(one,"第一代理人权限",checkOneFunc,{labelWidth:"120px"},false),
    checkbox_common_vm(two,"第二代理人权限",checkTwoFunc,{labelWidth:"120px"},false),
    upload_vm({label:"委托书扫描件",tip:"上传专利委托书",type:"custom",limit:1,field:"picture",common:true}),
]

const content = {
    rule
}

export default content