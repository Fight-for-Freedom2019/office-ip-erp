// 遗传资源来源披露登记表
import {vm as checkbox_common_vm} from "../formTemplate/checkbox-common";
import {vm as genetic_resources_vm} from "../formTemplate/genetic-resources";
import {checkboxFunc} from "./handle/handle";

const derive_from = {
    source_animal:"动物",
    source_plant:"植物",
    source_germ:"微生物",
    source_human:"人",
}
const other = {
    method_buy:"购买",
    method_exchange:"赠送或交换",
    method_deposit:"保藏机构",
    method_seedbank:"种子库（种质库）",
    method_genebank:"基因文库",
    method_gather:"自行采集",
    method_gather_wt:"委托采集",
    method_other:"其他",
}
let rule = [
    {
        type: "input",title: "发明创造名称",field: "title",value: "",
    },
    {
        type: "select",title: "申请人",field: "applicants",value: "",request: true,url: "",
        attrs:{
            placeholder:"应当填写第一署名申请人"
        },
    },
    {
        type: "input",title: "遗传资源名称",field: "inheritance_name",value: "",
    },
    {
        type: "span",
        title: "遗传资源的获取途径",
        field: "placeholder",
        col: {
            labelWidth:"100%",
        },
    },
    checkbox_common_vm(derive_from,"I、遗传资源取自：",checkboxFunc,{labelWidth:"140px"},false),
    checkbox_common_vm(other,"II、获取方式：",checkboxFunc,{labelWidth:"140px"},false),
    genetic_resources_vm(),
    {
        type: "input",title: "无法说明遗传资源原始来源的理由",field: "opinion",value: "",
        props:{
            type:"textarea"
        }
    },
]


const content = {
    rule
}

export default content