// 附件
import UploadFile from '@/components/page/cpc/UploadFile'
const defaultProps = {
  handlePreview: () => {
  },
  handleRemove: () => {
  },
  beforeRemove: () => {
  },
  handleExceed: () => {
  },
};

function vm({label, url, props = {}, tip = "", type = "custom", field = "attachments", common = false, accept = "", limit = 1000, optionType = "",warningTip}) {    // common:不出现选择类型弹窗
  const template = `
<div>
    <template v-if="type === 'file'">
        <el-upload
              class="upload-demo"
              ref="upload"
              :action="action"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              :auto-upload="false">
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">${tip}</div>
        </el-upload>
    </template>
    <template v-if="type === 'picture'">
        <el-upload
            :action=action
            :file-list="fileList"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </template>
    <template v-if="type === 'custom'">
        <upload-file :tip="tip" :customAccept="accept" :type="optionType" :isSave="isSave" :warning-tip="warningTip" :userDefined="userDefined" :customLimit="limit" :common="common" :fileListProp="fileList" @getFileList="getFileList"></upload-file>
    </template>
</div>
`;
  const options = {
    data: {
      extendData: {
        [field]: []
      },
      fileList: [],
      action: url,
      dialogImageUrl: "",
      dialogVisible: false,
      type: type,
      tip,
      common,
      limit,
      accept,
      userDefined: true,
      isSave: false,
      getValue:false,
      optionType,
      warningTip
    },
    created() {
      // this.extendData[field] = [];
      this.fileList = this.extendData[field];
    },
    watch:{
      extendData:{
        handler:function (val) {
          this.getValue?this.fileList = val[field]:"";
          this.getValue = false;
        },
        deep: true
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handlePreview: props.handlePreview ? props.handlePreview : defaultProps.handlePreview,
      handleRemove: props.handleRemove ? props.handleRemove : defaultProps.handleRemove,
      beforeRemove: props.beforeRemove ? props.beforeRemove : defaultProps.beforeRemove,
      handleExceed: props.handleExceed ? props.handleExceed : defaultProps.handleExceed,
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      getFileList(val) {
        this.getValue = true;
        this.extendData[field] = val;
        // console.log("extendData", this.extendData[field]);
      },
    },
    components: {UploadFile}
  };
  return {
    custom: true,
    vm: options,
    template: template,
    label: label,
    field: "__upload",
  };
}

export {vm}