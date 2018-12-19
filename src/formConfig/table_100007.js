// 专利代理委托书
import {vm as checkbox_common_vm} from "../formTemplate/checkbox-common";
import {vm as checkbox_vm} from "../formTemplate/checkbox";
import {vm as upload_vm} from "../formTemplate/Upload";

let rule = [
    checkbox_vm("poa_declaration","声明填写的专利代理委托信息与专利代理委托书扫描件是一致的",{labelWidth:"120px"},"声明"),
    {
        type:"input",title:"发明创造名称",field:"title",value:"",
    },
    {
        type:"input",title:"申请号/专利号",field:"patent_number",value:"",
    },
    {
        type:"select",title:"委托人",field:"applicants",value:[],
        props: {
            multiple: true,
            filterable: true,
        },
        request: true,
        url: "",

    },
    checkbox_common_vm({poa_application:"代为办理专利申请或专利在专利权有效期内的全部事务",poa_search_report:"代为办理专利权评价报告或者实用新型专利检索报告"},"委托类型","",{labelWidth:"120px"}),
    {
        type:"select",title:"代理机构",field:"agency",value:[],
        props: {
            multiple: true,
            filterable: true,
        },
        request: true,
        url: "",

    },
    {
        type:"select",title:"代理人",field:"agents",value:[],
        props: {
            multiple: true,
            filterable: true,
            "multiple-limit":2,
        },
        request: true,
        url: "",
    },
    upload_vm({type:"file",tip:"",label:"委托书扫描件"})
]
const content = {
    rule
}

export default content
