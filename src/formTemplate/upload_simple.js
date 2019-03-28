// 请求内容
let count = 0;
const uniqueId = () => ++count;

function vm() {
  const template = `
<div>
        <el-upload
            action="api/files"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleFileUploadSuccess"
            :headers="auth"
            list-type="picture"
            :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传委托书扫描件，点击文件名可修改</div>
        </el-upload>
        <div class="viewListWrap">
          <ul>
            <li v-for="item in viewFileList">
              <el-button type="text" @click="viewFile(item)">查看</el-button>
            </li>
          </ul>
        </div>
        <el-dialog
      custom-class="upload_simple"
      :append-to-body="true"
      :visible.sync="renameDialog"
      title="修改文件名"
      :modal="false"
      width="40%"
      top="6vh"
    >
      <el-form :model="renameForm" label-position="left" ref="renameForm">
        <el-form-item prop="name" label="文件名">
          <el-input v-model="renameForm.name" placeholder="请输入文件名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="saveFileName">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>  
      </div>
`;
  const options = {
    data: {
      fileList: [],
      extendData: {
        pictures:[],
      },
      renameForm:{
        name:"",
      },
      renameDialog:false,
      renameFile:null,
    },
    created(){
      this.fileList = this.extendData.pictures;
    },
    methods:{
      controlDialog(c) {
        this.renameDialog = c === 'block' ? true : false
        const parent = document.getElementsByClassName('upload_simple')[0].parentNode
        parent.style.display = c
      },
      saveFileName(){
        if(this.renameForm.name !== "") {
          if(this.renameFile.response) {
            this.fileList.forEach((i)=>{
              if(i.response) {
                if(i.response.data.file.id === this.renameFile.response.data.file.id) {
                  i.response.data.file.name = this.renameForm.name;
                  i.name = this.renameForm.name;
                }
              }else {
                if(i.id === this.renameFile.id) {
                  i.name = this.renameForm.name;
                }
              }
            })
          }else {
            this.fileList.forEach((i)=>{
              if(i.response) {
                if(i.response.data.file.id === this.renameFile.response.data.file.id)
                  i.response.data.file.name = this.renameForm.name;
                i.name = this.renameForm.name;
              }else {
                if(i.id === this.renameFile.id) {
                  i.name = this.renameForm.name;
                }
              }
            })
          }
          this.saveData();
        }
        // this.renameDialog = false;
        this.controlDialog("none");
        // this.extendData.pictures = this.fileList;
      },
      handleFileUploadSuccess(r, f, fl){
        this.fileList = fl;
        console.log("fl",fl);
        this.saveData();
      },
      uniq(arr,id){
        return arr.filter((i)=>i.id !== id)
      },
      saveData(){
        this.fileList.forEach((i)=>{
          if(i.response) {
            this.extendData.pictures = this.uniq(this.extendData.pictures,i.response.data.file.id);
            this.extendData.pictures.push(i.response.data.file);
          }else {
            this.extendData.pictures = this.uniq(this.extendData.pictures,i.id);
            this.extendData.pictures.push(i);
          }
        })
      },
      handleRemove(f, fl) {
        this.fileList = fl;
        let id = f.response?f.response.data.file.id:f.id;
        const success = _ => {
          this.extendData.pictures = this.uniq(this.extendData.pictures,id)
          this.$message({ type: "success", message: "删除成功!" });
          this.saveData();
        };
        this.$axiosDelete({ url: `/files/${id}`, data: {}, success });
      },
      handlePreview(file) {
        // this.renameDialog = true;
        this.controlDialog("block");
        this.renameFile = file;
      },
      viewFile(url){
        window.open(url);
      },
    },
    computed:{
      auth:function(){
        return { Authorization: window.localStorage.getItem("token") };
      },
      viewFileList: function() {
        let arr = [];
        this.fileList.forEach(item => {
          if (item.response) {
            arr.push(item.response.data.file.viewUrl);
          }else {
            arr.push(item.viewUrl);
          }
        });
        return arr;
      },
    },
  };
  return {
    custom: true,
    vm: options,
    template: template,
    label: '委托书扫描件',
    field: "__tmp" + uniqueId(),
  }
}

export {vm}