// 著录项目变更理由证明
import reasons from '../formTemplate/reasons'
import {vm as checkbox_common_vm} from "../formTemplate/checkbox-common";
import {vm as table100104_vm} from "../formTemplate/table100104";
import {vm as citations_information_vm} from "../formTemplate/citations-information";
import {vm as upload_vm} from "../formTemplate/Upload";
import lodash from 'lodash'
/*let change_project = [];
let change_reasons = [];
let change_evidence = [];
let change_project_id = null;
let change_reasons_id = null;
window.$fc_citations_info = null;
reasons.forEach((item)=>{
    let obj = {value:{id:item.id,name:item.name},label:item.name};
    change_project.push(obj);
    item.child.forEach((reason)=>{
        change_reasons.push({value:{id:reason.id,name:reason.name},label:reason.name})
        reason.child.forEach((evidence)=>{
            change_evidence.push({value:{id:evidence.id,name:evidence.name},label:evidence.name})
        })
    })
})*/
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
        type:"select",title:"申请人",field:"applicants",value:[],
    },
  table100104_vm(),
    /*{
        type:"select",title:"变更项目",field:"type",value:"",
        options:change_project,
        props:{
            clearable:true,
            "value-key":"id"
        },
        event:{}
    },
    {
        type:"select",title:"变更理由",field:"reason",value:"",
        options:change_reasons,
        props:{
            clearable:true,
            "value-key":"id",
        },
        event:{}
    },
    {
        type:"select",title:"证明文件种类",field:"evidence",value:"",
        options:change_evidence,
        props:{
            clearable:true,
            "value-key":"id",
        },
        event:{}
    },*/
    checkbox_common_vm(statement,"声明",()=>{},{labelWidth:"120px"},false),
    citations_information_vm(),
    upload_vm({label:"附件",url:"",tip:"Note:附件支持PDF格式以及JPG格式，但两种格式只能二选一",type:"custom",field:"pictures"}),

]

rule = copy(rule);

function copy(r) {
    let change_documents = [];
    let obj = lodash.cloneDeep(r);
    let rule = obj;
    /*rule[3].event.change = (val)=>{
        change_project_id = val.id;
        rule[4].options.length = 0;
        rule[5].options.length = 0;
        rule[4].value = "";
        rule[5].value = "";
        let targetArr = reasons.filter((item)=>{
            if(item.id === val.id){
                return true
            }
        })[0];
        targetArr.child.forEach((item)=>{
            rule[4].options.push({value:{id:item.id,name:item.name},label:item.name})
        })
        rule[4].value = rule[4].options[0].value;
        rule[4].event.change(rule[4].value);
    }
    rule[4].event.change = (val)=>{
        change_reasons_id = val.id;
        rule[5].options.length = 0;
        rule[5].value = "";
        let reasonsArr = reasons.filter((item)=>{
            if(item.id === change_project_id){
                return true
            }
        })[0];
        let targetArr = reasonsArr.child.filter((item)=>{
            if(item.id === val.id){
                return true
            }
        })[0];
        change_documents = targetArr.child;
        change_documents.forEach((item)=>{
            rule[5].options.push({value:{id:item.id,name:item.name},label:item.name})
        })
        rule[5].value = rule[5].options[0].value;
        // changeDocumentsType(rule[5].value);
        rule[5].event.change(rule[5].value);
    }
    rule[5].event.change = (val)=>{
        window.$fc_citations_info = change_documents.filter((item)=>{
            if(item.id === val.id){
                return true
            }
        })[0];
    }*/
    return obj
}

let content = {

    rule,
}
for (let i = 2;i<=10;i++){
    content[`rule_100104${i}`] = copy(rule);
}
export default content
