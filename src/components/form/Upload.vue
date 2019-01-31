    <template>
      <el-upload
      :on-success="handleUploadSuccess"
      :on-remove="handleUploadRemove"
      action="/api/files"
      :headers="auth"
      :show-file-list="showFileList"
      :on-preview="onPreview"
      :on-progress="onProgress"
      :on-exceed="handleExceed"
      :before-upload="handleUploadBefore"
      :file-list="uploadList"
      :limit="limit"
      multiple
      ref="upload"
      class="app-upload"
    >           <!-- <i class="el-icon-upload"></i> -->
        <el-button size="small" type="primary">点击上传</el-button>
        <div class="el-upload__tip" slot="tip"><slot></slot></div>
    </el-upload>
    </template>

    <script>
    export default {
      name: 'upload',
      props: {
        'value': {
            type: Array,
            default () {
                return [];
            },
        },
        'fileList': {
            type: Array,
            default () {
              return [];
            }
        },
        'showFileList': {
          type: Boolean,
          default: true,
        },
        'uploadText': String,
        'limit': Number,
      },
      computed: {
        auth () {
          return { Authorization: window.localStorage.getItem('token') }
        },
      },
      data () {
        return {
          uploadList: [],
        };
      },
      methods: {
        getFileList () {
          return this.$refs.upload.uploadFiles;
        },
        clearFiles () {
          this.$refs.upload.clearFiles();
        },
        handleUploadBefore (f) {
          if (f.size > 200*1024*1024) {
            this.$message({type: 'warning',message:'上传文件大小不能超过200M！'});
            return false;
          }else {
            return true;
          }
        },
        handleExceed (f, fl) {
           this.$message({type: 'warning',message:`限制上传${this.limit}个文件`});
        },
        handleUploadSuccess (p, f, fl) {
          // console.log(fl);
          let file_ids;
          if(p.status) {
            const arr = [];
            const id = p.data.file.id;
            const copy = [...this.value];
            f.id = id;
            f.downloadUrl = p.data.file.downloadUrl;
            copy.push(id);
            this.uploadList=fl;
            this.$emit('input', copy);
            this.$nextTick(_=>{
              file_ids = this.$tool.splitObj(fl, 'id');
              file_ids.forEach(v=>{
                if(arr[v]) {
                  this.$message({message: '有重复的文件,请核对是否正确', type: 'warning'});
                }
                arr[v] = true;
              })
            })
          }else {
            this.$message({message:p.info, type: 'warning'});
            this.uploadList.splice(fl.length,1);
            // this.clearFiles();
            return this.uploadList;
          }
        },
        onPreview (file) {
            window.location.href = file.downloadUrl;
        },
        onProgress (e, f, fl) {
        }, 
        handleUploadRemove (f) {
          const id = f.id;
          const v = this.value;
          let i = v.length;

          while(i--) {
            if(v[i] == id) break;
          }
          const copy = [...v];
          copy.splice(i, 1);
          this.$emit('input', copy);

        },
      },
      created () {
        this.uploadList = this.fileList;
      },
      watch:{
        'fileList':{
          handler(val){
            this.uploadList = val;
          },
        }
      }
    }
    </script>

    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style>

    </style>
    <style scoped lang="scss">
    </style>