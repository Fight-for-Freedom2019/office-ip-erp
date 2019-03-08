// 专利代理委托书（中英文）
import {vm as upload_vm} from '../formTemplate/Upload'
import {vm as checkbox_vm} from '../formTemplate/checkbox'
let rule = [
  {
    type: "select", title: "委托人", field: "applicants", value: []
  },
  {
    type: "input", title: "委托人英文名称", field: "english_name", value: "",
  },
  checkbox_vm("poa_type", "是否有委托事项", {}, '委托事项'),
  {
    type: "select", title: "代理机构", field: "agency", value: [],

  },
  {
    type: "select", title: "代理人", field: "agents", value: [],
    props: {
      "multiple-limit": 2,
    },

  },
  upload_vm({label: "委托书扫描件", url: "/url", tip: "上传专利委托书", type: "custom", limit: 1, field: "picture", common: true}),
]


const content = {
  rule
}

export default content
