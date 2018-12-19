// 著录项目变更理由证明
import reasons from '../formTemplate/reasons'
import {vm as checkbox_common_vm} from "../formTemplate/checkbox-common";
import {vm as citations_information_vm} from "../formTemplate/citations-information";
import {vm as upload_vm} from "../formTemplate/Upload";
let change_project = [];
let change_reasons = [];
let change_evidence = [];
let change_documents = [];
let change_project_id = null;
let change_reasons_id = null;
window.$fc_citations_info = null;
reasons.forEach((item)=>{
    let obj = {value:item.id,label:item.name};
    change_project.push(obj);
},)

function changeProject(val){
    change_project_id = val;
    change_reasons.length = 0;
    change_evidence.length = 0;
    rule[4].value = "";
    rule[5].value = "";
    let targetArr = reasons.filter((item)=>{
        if(item.id === val){
            return true
        }
    })[0];
    targetArr.child.forEach((item)=>{
        change_reasons.push({value:item.id,label:item.name})
    })
    rule[4].value = change_reasons[0].value;
    changeReason(rule[4].value)
};
function changeReason(val) {
    change_reasons_id = val;
    change_evidence.length = 0;
    rule[5].value = "";
    let reasonsArr = reasons.filter((item)=>{
        if(item.id === change_project_id){
            return true
        }
    })[0];
    let targetArr = reasonsArr.child.filter((item)=>{
        if(item.id === val){
            return true
        }
    })[0];
    change_documents = targetArr.child;
    change_documents.forEach((item)=>{
        change_evidence.push({value:item.id,label:item.name})
    })
    rule[5].value = change_evidence[0].value;
    changeDocumentsType(rule[5].value);
}
// 证明文件种类
function changeDocumentsType(val) {
    //citations_info
    window.$fc_citations_info = change_documents.filter((item)=>{
        if(item.id === val){
            return true
        }
    })[0];
}
const statement = {
    sign:"声明上述当事人已经全部签字或者盖章",
    sign_agency:"声明出具部门已经签字或者盖章",
}

let rule = [
    {
        type:"input",title:"申请号",field:"patent_number",value:"",
    },
    {
        type:"input",title:"发明创造名称",field:"patent_title",value:"",
    },
    {
        type:"select",title:"申请人",field:"applicants",value:"",
    },
    {
        type:"select",title:"变更项目",field:"type",value:"",
        options:change_project,
        props:{
            clearable:true
        },
        event:{
            change:changeProject,
        }
    },
    {
        type:"select",title:"变更理由",field:"reason",value:"",
        options:change_reasons,
        props:{
            clearable:true
        },
        event:{
            change:changeReason,
        }
    },
    {
        type:"select",title:"证明文件种类",field:"evidence",value:"",
        options:change_evidence,
        props:{
            clearable:true
        },
        event:{
            change:changeDocumentsType,
        }
    },
    // TODO 这个CheckBox的逻辑要改
    checkbox_common_vm(statement,"声明",()=>{},{labelWidth:"120px"},false),
    citations_information_vm(),
    upload_vm({label:"附件",url:"/url",tip:"Note:附件支持PDF格式以及JPG格式，但两种格式只能二选一"}),

]
const content = {
    rule
}

export default content
