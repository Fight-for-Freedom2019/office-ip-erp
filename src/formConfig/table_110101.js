//发明专利请求书
import {vm as statement} from '../formTemplate/statement'
import {vm as priority} from '../formTemplate/priority'
import {vm as checkbox_common_vm} from '../formTemplate/checkbox-common'
import {vm as checkbox_vm} from '../formTemplate/checkbox'
import address from '../formTemplate/address'
import {vm as date_common_vm} from "../formTemplate/date_common";

const novelty_claims = {
  novelty_exception_exhibition: "已在中国政府主办或承认的国际展览会上首次展出",
  novelty_exception_published: "已在规定的学术会议或技术会议上首次发表",
  novelty_exception_leakage: "他人未经申请人同意而泄露其内容",
}

function handleLinkage(checked) {
  address.forEach((item) => {
    if (item.value === checked) {
      content.rule.forEach((i) => {
        if (i.field === "bio_desposit_address") {
          i.value = item.address;
        }
      })
    }
  })
}

function clearAddress() {
  content.rule.forEach((i) => {
    if (i.field === "bio_desposit_address") {
      i.value = "";
    }
  })
}

let rule = [
  {
    type: 'input', title: '发明名称', field: 'title', value: '',
  },
  {
    type: 'select', title: '发明人', field: 'inventors', value: [],
  },
  {
    type: 'select', title: '申请人', field: 'applicants', value: [],
  },
  statement,
  {
    type: 'select', title: '联系人', field: 'contact', value: [],
    props: {
      multiple: true,
      filterable: true,
    },
  },
  {
    type: 'select', title: '代理机构', field: 'agency', value: [],
  },
  {
    type: 'select', title: '代理人', field: 'agents', value: [],
  },
  checkbox_vm("poa_declaration", "声明已经与申请人签订了专利代理委托书且本表中的信息与委托书中相应信息一致", {labelWidth: "120px"}, "代理声明"),
  {
    type: 'select', title: '总委托书编号', field: 'poa', value: [],
    /*props:{
        "value-key":"id"
    },*/
    attrs: {
      placeholder: '请选择总委托书编号（如果有）'
    },
  },
  priority,
  {
    type: 'input', title: '权利要求项数', field: 'claims_count', value: '',
  },
  {
    type: 'input', title: '摘要附图图号', field: 'abstract_figure', value: '',
  },
  {
    type: 'input', title: '分案申请', field: 'division_number', value: '',
    attrs: {
      placeholder: '请输入原申请号'
    },
    col: {
      span: 12,
    },
  },
  {
    type: 'input', title: '', field: 'division_division_number', value: '',
    attrs: {
      placeholder: '针对的分案申请号'
    },
    col: {
      span: 12,
      labelWidth: '0',
    },
  },
  date_common_vm({field: "division_apd", label: "原申请日"}),
  /*{
      type: 'DatePicker', title: '', field: 'division_apd', value: "",
      col: {
          span: 6,
          labelWidth: '0',
      },
  },*/
  checkbox_vm("bio_alive", "是否存活", {labelWidth: "120px"}, "生物材料样品"),
  {
    type: 'select', title: '生物保藏机构', field: 'bio_deposit_center', value: '',
    props: {
      multiple: false,
      filterable: true,
      clearable: true,
    },
    options: address,
    event: {
      change: handleLinkage,
      clear: clearAddress
    },
    attrs: {
      placeholder: '请选择生物保藏机构'
    },
    col: {
      // labelWidth: '110px',
    },
  },
  {
    type: 'input', title: '保藏地址', field: 'bio_desposit_address', value: '',
    attrs: {
      placeholder: '请输入地址'
    },
    col: {
      // span: 10,
    },
  },
  date_common_vm({field: "bio_deposit_date", label: "保藏日期"}),
  /*{
      type: 'DatePicker', title: '', field: 'bio_deposit_date', value: "",
      attrs: {
          placeholder: '请输入保藏日期'
      },
      col: {
          span: 14,
          labelWidth: '110px',
      },
  },*/
  {
    type: 'input', title: '保藏编号', field: 'bio_deposit_number', value: '',
    /*attrs: {
      placeholder: '请输入保藏编号'
    },
    col: {
      span: 5,
      labelWidth: '0',
    },*/
  },
  {
    type: 'input', title: '分类命名', field: 'bio_deposit_species', value: '',
    attrs: {
      placeholder: '请输入分类命名'
    },
    /*col: {
      span: 5,
      labelWidth: '0',
    },*/
  },

  checkbox_vm("squence_table", "本申请涉及核苷酸或氨基酸序列表", {labelWidth: "120px"}, "序列表"),
  checkbox_vm("inheritance", "本专利申请涉及的发明创造是依赖于遗传资源完成的", {labelWidth: "120px"}, "遗传资源"),
  checkbox_vm("is_utility", "声明本申请人对同样的发明创造在申请本发明专利的同日申请了实用新型专利", {labelWidth: "120px"}, "同日申请"),
  checkbox_vm("prepubic", "请求早日公布该专利申请", {labelWidth: "120px"}, "提前公布"),
  checkbox_common_vm(novelty_claims, "不丧失新颖性声明", "", {labelWidth: "120px"}),
  checkbox_vm("subs_exam", "同时提出实质审查请求", {labelWidth: "120px"}, "实质审查", {id: 110401, name: "实质审查请求书"}),
  checkbox_vm("confidential_exam", "向国外申请专利保密审查请求", {labelWidth: "120px"}, "保密审查", {
    id: 100027,
    name: "向外国申请专利保密审查请求书"
  }),
  // TODO 附件要配置
  {
    type: 'select', title: '附件（非必填）', field: 'attachments', value: [],
    props: {
      multiple: true,
      filterable: true,
    },
  },
  {
    type: 'input', title: '证明文件备案号', field: 'document_number', value: [],
    attrs: {
      placeholder: '请选择总委托书编号（如果有）'
    },
    request: true,
    url: '/test',
  },
];
const content = {
  rule
}

export default content
