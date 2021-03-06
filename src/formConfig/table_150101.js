// 国际申请进入中国国家阶段声明（PCT）[发明]
import {vm as statement} from '../formTemplate/statement'
import {vm as checkbox_vm} from '../formTemplate/checkbox'
import {vm as checkbox_common_vm} from '../formTemplate/checkbox-common'
import {vm as review_declaration_vm} from '../formTemplate/review-declaration'
import {vm as priority_table} from '../formTemplate/priority-table'
import {vm as invoking_accession_vm} from '../formTemplate/invoking-accession'
import {vm as review_request_vm} from '../formTemplate/review-request'
import address from '../formTemplate/address'
import {vm as date_common_vm} from "../formTemplate/date_common";

// 提前处理
const early_treatment = {
  advance_processing_111: "自优先权日起30个月的期限未满，请求国家知识产权局按照专利法实施细则第111条提前处理",
  advanced_processing_not_published: "本国际申请尚未公布，请求国家知识产权局作为指定局要求国际局传送国际申请文件副本"
}

// 关于援引加入的声明
const invoking_accession = {
  reference_not_included: "本国际申请在国际阶段有援引加入部分，进入时提交的中文译文未包含援引加入的部分。",
  reference_included: "本国际申请在国际阶段含有援引加入项目或部分，提交的中文译文中包含下列援引加入项目或部分，请求修改相对于中国的申请日："
}
// 不丧失新型性宽限期说明
const grace_period = {
  novelty_exception_exhibition: "已在中国政府主办或承认的国际展览会上首次展出，并在提出国际申请时作出过声明",
  novelty_exception_published: "已在规定的学术会议或技术会议上首次发表，并在提出国际申请时作出过声明",
}
// 复查请求
const review_request = {
  review_request_apd_rejected: "受理局拒绝给出国际申请日",
  review_request_article12: "国际局按照专利合作条约第12条（3）作出认定",
  review_request_withdrawn: "受理局宣布申请被视为撤回",
}
const review_request2 = {
  review_request_documents_transferred: "已请求国际局将档案中有关文件传送国家知识产权局",
  review_request_national_stage: "已依照专利法实施细则第103条办理进入中国国家阶段的手续",
}

const language = [
  {value: "ZH", label: "中文[ZH]"},
  {value: "DE", label: "德语[DE]"},
  {value: "EN", label: "英语[EN]"},
  {value: "ES", label: "西班牙语[ES]"},
  {value: "FR", label: "法语[FR]"},
  {value: "JA", label: "日语[JA]"},
  {value: "KO", label: "韩语[KO]"},
  {value: "RU", label: "俄语[RU]"},
  {value: "PT", label: "葡萄牙语[PT]"},
  {value: "OO", label: "其它[OO]"},
]
let rule = [
  {
    type: "input", title: "国际申请号", field: "pct_apn", value: "",
    col: {
      span: 12
    },
  },
  {
    type: "input", title: "国际申请日", field: "pct_apd", value: "",
    col: {
      span: 12
    },
    class: "label-padding"
  },
  {
    type: "input", title: "国际公布号", field: "pct_public_number", value: "",
    col: {
      span: 12
    },
  },
  {
    type: "input", title: "国际公布日", field: "pct_public_date", value: "",
    col: {
      span: 12
    },
    class: "label-padding"
  },
  {
    type: "select", title: "国际公布语言", field: "pct_public_language", value: "",
    col: {
      span: 12
    },
    options: language
  },
  {
    type: "input", title: "优先权日", field: "pct_priority_date", value: "",
    col: {
      span: 12
    },
    class: "label-padding",
  },
  {
    type: "input", title: "发明名称", field: "title", value: "",
  },
  {
    type: "select", title: "申请人", field: "applicants", value: []
  },
  statement,
  {
    type: "select", title: "发明人", field: "inventors", value: [],
  },
  {
    type: "select", title: "联系人", field: "contact", value: [],
  },
  {
    type: "select", title: "代理机构", field: "agency", value: []
  },
  {
    type: "select", title: "代理人", field: "agents", value: []
  },
  {
    type: "input", title: "权利要求项数", field: "claims_count", value: "",
  },
  checkbox_common_vm(early_treatment, "提前处理", "", {labelWidth: "120px"}),
  checkbox_vm("prepublic", "根据专利法第34条的规定，请求早日公开该专利申请", {}, '提前公布'),
  {
    type: "span",
    title: "审查基础文本声明",
    field: "placeholder",
    col: {
      labelWidth: "100%",
    },
    class: "font-bold"
  },
  checkbox_vm("exam_basis_original", "以原始申请中的译文为审查基础", {labelWidth: "0px", span: 10}),
  checkbox_vm("exam_basis_designated", "以下列申请文件为审查基础", {labelWidth: "0px", span: 10}),
  checkbox_vm("exam_basis_spec", "说明书", {labelWidth: "0px", span: 7}),
  review_declaration_vm("exam_basis_spec"),
  checkbox_vm("exam_basis_aclm", "权利要求书", {labelWidth: "0px", span: 7}),
  review_declaration_vm("exam_basis_aclm"),
  checkbox_vm("exam_basis_figs", "附图", {labelWidth: "0px", span: 7}),
  review_declaration_vm("exam_basis_figs"),
  checkbox_vm("exam_basis_seq", "核甘酸和/或氨基酸序列表", {labelWidth: "0px", span: 7}),
  review_declaration_vm("exam_basis_seq"),
  priority_table,
  {
    type: "span",
    title: "关于遗传资源的说明",
    field: "placeholder1",
    col: {
      labelWidth: "100%",
    },
    class: "font-bold"
  },
  checkbox_vm("inheritance", "本国际申请涉及的发明创造是依赖于遗传资源完成的", {labelWidth: "0px", span: 10}),
  {
    type: "span",
    title: "关于援引加入的声明",
    field: "placeholder2",
    col: {
      labelWidth: "100%",
    },
    class: "font-bold"
  },
  checkbox_common_vm(invoking_accession),
  checkbox_vm("reference_spec", "说明书", {labelWidth: "0px", span: 7}),
  invoking_accession_vm("reference_spec"),
  checkbox_vm("reference_aclm", "权利要求", {labelWidth: "0px", span: 7}),
  invoking_accession_vm("reference_aclm"),
  checkbox_vm("reference_figs", "附图", {labelWidth: "0px", span: 7}),
  invoking_accession_vm("reference_figs"),
  {
    type: "span",
    title: "生物材料样品保藏",
    field: "placeholder3",
    col: {
      labelWidth: "100%",
    },
    class: "font-bold"
  },
  checkbox_vm("biological", "本国际申请涉及的生物材料样品的保藏已在专利合作条约实施细则第13条之2.4规定的期限内以下列形式作出记载：", {labelWidth: "0px"}),
  /*{
    type: "span",
    title: "保藏编号",
    field: "placeholder4",
    col: {
      labelWidth: "100%",
      span: 4
    },
  },
  {
    type: "span",
    title: "保藏日期",
    field: "placeholder5",
    col: {
      labelWidth: "100%",
      span: 4
    },
  },
  {
    type: "span",
    title: "保藏单位",
    field: "placeholder6",
    col: {
      labelWidth: "100%",
      span: 8
    },
  },
  {
    type: "span",
    title: "说明书译文第_页_行或PCT/RO/134表",
    field: "placeholder7",
    col: {
      labelWidth: "100%",
      span: 8
    },
  },*/
  {
    type: "input", title: "保藏编号", field: "biological_number", value: "",
    attrs: {
      placeholder: "请输入保藏编号"
    },
    /*col: {
      labelWidth: "0px",
      span: 4
    }*/
  },
  date_common_vm({field: "biological_date", label: "保藏日期"}),
  /*{
      type:"DatePicker",title: "",field: "biological_date",value:"",
      attrs:{
          placeholder:"请输入保藏日期"
      },
      col:{
          labelWidth:"0px",
          span:4
      }
  },*/
  {
    type: "select", title: "保藏单位", field: "biological_orgnization", value: "",
    options: address,
    /*attrs: {
      placeholder: "请选择保藏单位"
    },*/
    /*col: {
      labelWidth: "0px",
      span: 8
    }*/
  },
  {
    type: "input", title: "页码", field: "biological_page", value: "",
    attrs: {
      placeholder: "请输入页码或PCT/RO/134表"
    },
    /*col: {
      labelWidth: "0px",
      span: 8
    }*/
  },
  {
    type: "span",
    title: "不丧失新型性宽限期说明",
    field: "placeholder8",
    col: {
      labelWidth: "100%",
    },
    class: "font-bold"
  },
  checkbox_common_vm(grace_period),
  {
    type: "span",
    title: "复查请求",
    field: "placeholder9",
    col: {
      labelWidth: "100%",
    },
    class: "font-bold"
  },
  review_request_vm(),
  checkbox_common_vm(review_request, "", () => {
  }, {labelWidth: "30px"}),
  checkbox_vm("review_request_article25", "根据专利合作条约第25条特此向国家知识产权局提出复查请求，并且", {labelWidth: "0px"}),
  checkbox_common_vm(review_request2, "", () => {
  }, {labelWidth: "30px"}),
  {
    type: "select", title: "附件（非必填）", field: "attachments", value: []
  }
]

const content = {
  rule
}

export default content
