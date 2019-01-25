// 外观设计图片或照片
import {vm as upload_vm} from '../formTemplate/Upload'

let rule = [
    upload_vm({label:"",tip:"上传外观设计图片或照片",type:"custom",field:"files",optionType:"design"}),

]

const content = {
    rule
}

export default content
