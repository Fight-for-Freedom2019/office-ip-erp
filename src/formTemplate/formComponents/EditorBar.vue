<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  export default {
    name: 'Editorbar',
    data () {
      return {
        editor: null,
        info_: null
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      isClear: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isClear (val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear()
          this.info_ = null
        }
      }
    },
    mounted () {
      this.seteditor()
      /*let reg = /\<spanyes(.*?)\>|\<\/spanyes(.*?)\>|(\s+face="楷体")/g;
      let html = this.value.replace(reg,"");
      html = html.replace(/<font>/g,"");
      html = html.replace(/<\/font>/g,"");
      this.editor.txt.html(html);*/
      this.editor.txt.html(this.value);
    },
    methods: {
      seteditor () {
        this.editor = new E(this.$refs.toolbar, this.$refs.editor)

        this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
        this.editor.customConfig.uploadImgServer = 'api/files' // 配置服务器端地址
        this.editor.customConfig.zIndex = 100
        this.editor.customConfig.pasteIgnoreImg = false
        this.editor.customConfig.uploadImgHeaders = {Authorization: window.localStorage.getItem("token")}// 自定义 header
        this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
        this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
        this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
        this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
        this.editor.customConfig.pasteTextHandle = function (content) {
          // let reg = /\<spanyes(.*?)\>|\<\/spanyes(.*?)\>|(face="楷体")/g;
          // content = content.replace(reg,"");
          /*let regs = ["/<(\/{0,1})font>/i", "/<(\/{0,1})span>/i", "/<(\/{0,1})div>/i", "/<(\/{0,1})br>/i", "/<(\/{0,1})a>/i", "/<(\/{0,1})o:p>/i", "/<!\-\-.*\-\->/is"]
          regs.forEach((r)=>{
            content = content.replace(r,"");
          })*/
          // content = content.replace(/<font>/g,"");
          // content = content.replace(/<\/font>/g,"");
          // content = content.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
          console.log(content);
          /*content = content.replace(/<\/?SPANYES[^>]*>|(face="楷体")/gi, "");
          content = content.replace(/<\/?font[^>]*>/gi, "");
          content = content.replace(/<\/?body[^>]*>/gi, "");
          content = content.replace(/<\/?span[^>]*>/gi, "");
          content = content.replace(/<\/?bstyle[^>]*>/gi, "");
          content = content.replace(/<(\w[^>]*)class=([^|>]*)([^>]*)/gi, "<$1$3");
          content = content.replace(/<(\w[^>]*)style="([^"]*)"([^>]*)/gi, "<$1$3");
          content = content.replace(/<(\w[^>]*)lang=([^|>]*)([^>]*)/gi, "<$1$3");
          content = content.replace(/<\\?\?xml[^>]*>/gi, "");
          content = content.replace(/<\/?\w+:[^>]*>/gi, "");
          content = content.replace(/ /, "");
          content = content.replace(/\s/gi, "");
          content = content.replace(/\n(\n)*( )*(\n)*\n/gi, '\n');
          content = content.replace(/<head>[\s\S]*<\/head>/g, '');
          content = content.replace(/<html(\S*)"\>/g, '');*/
          content = content.replace(/<style>[\s\S]*<\/style>/gi, "");
          content = content.replace(/<title>[\s\S]*<\/title>/gi, "");
          content = content.replace(/<!--(\w|\W)+?-->/gi, "");
          content = content.replace(/<title>(\w|\W)+?<\/title>/gi, "");
          content = content.replace(/\s?class=\w+/gi, "");
          content = content.replace(/\s+style="[^"]+"/gi, "");
          content = content.replace(/\s+style='[^']+'/gi, "");
          content = content.replace(/<(meta|link|\/?o:|\/?style|\/?font|\/?strong|\/?st\d|\/?head|\/?a|\/?html|body|\/?body|\/?span|!\[)[^>]*?>/gi, "");
          content = content.replace(/(<[^>]+>)+ (<\/\w+>)+/gi, "");
          content = content.replace(/\s+v:\w+="[^"]+"/gi, "");
          // content = content.replace(/\"|\\\"/gi, "\"");
          console.log(content);

          return content
        }
        // 配置菜单
        this.editor.customConfig.menus = [
          // 'head', // 标题
          'bold', // 粗体
          // 'fontSize', // 字号
          // 'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          // 'strikeThrough', // 删除线
          // 'foreColor', // 文字颜色
          // 'backColor', // 背景颜色
          // 'link', // 插入链接
          // 'list', // 列表
          // 'justify', // 对齐方式
          // 'quote', // 引用
          // 'emoticon', // 表情
          'image', // 插入图片
          'table', // 表格
          // 'video', // 插入视频
          // 'code', // 插入代码
          'undo', // 撤销
          'redo' // 重复
        ]

        this.editor.customConfig.uploadImgHooks = {
          fail: (xhr, editor, result) => {
            // 插入图片失败回调
          },
          success: (xhr, editor, result) => {
            // 图片上传成功回调
          },
          timeout: (xhr, editor) => {
            // 网络超时的回调
          },
          error: (xhr, editor) => {
            // 图片上传错误的回调
          },
          customInsert: (insertImg, result, editor) => {
            // 图片上传成功，插入图片的回调
            // console.log("image result",result);
            insertImg(result.data.file.viewUrl);
          }
        }
        this.editor.customConfig.onchange = (html) => {
          // html = html.replace(/\"/gi, "\\\" ");
          html = html.replace(/\s+style="[^"]+"/gi, "");
          this.info_ = html // 绑定当前逐渐地值
          this.$emit('change', this.info_) // 将内容同步到父组件中
        }

        // 创建富文本编辑器
        this.editor.create()
      }
    }
  }
</script>

<style lang="css">
  .editor {
    width: 80%;
    margin: 0 auto;
  }
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    height: 500px;
  }
</style>