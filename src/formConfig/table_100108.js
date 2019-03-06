// 其它证明文件
import {vm as upload_vm} from '../formTemplate/Upload'

let rule = [
  {
    type: "input", title: "申请号", field: "patent_number", value: "",
  },
  {
    type: "hidden", field: "type", value: "form",
  },
  upload_vm({label: "图片", url: "/url", tip: "上传图片", type: "custom", field: "pictures", common: true}),

]
const content = {
  rule    // rule字段名称不能更改
}

export default content
