// 外观设计图片或照片
import {vm as upload_vm} from '../formTemplate/Upload'

let rule = [
    upload_vm({label:"",tip:"注：文件名中含有文件类型的已自动匹配，如文件名中没有文件类型相关字符，请点击文件名选择文件类型",type:"custom",field:"files",optionType:"design",warningTip:true}),

]

const content = {
    rule
}

export default content
