<template>
  <el-form label-width="100px" label-position="right" :model="form" :rules="rules" ref="form">
    <el-row>
      <el-col :span="8">
        <el-form-item label="案号" prop="serial">
          <el-input v-model="form.serial" placeholder="请填写案号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入商标名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="第三方订单号" prop="order_serial">
          <el-input v-model="form.order_serial" placeholder="请填写第三方订单号"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-form-item
          label="国家"
          prop="area"
          :rules="{ type: pageType=='add' ? 'array' : 'string',required: true, message: '国家不能为空', trigger: 'change'}"
        >
          <region v-model="form.area" :multiple="pageType == 'add'"></region>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="案件状态" prop="project_stage">
          <static-select type="project_stage" v-model="form.project_stage"></static-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="子类型" prop="subtype">
          <static-select type="trademark_type" v-model="form.subtype"></static-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="16">
        <el-form-item label="申请人" prop="applicants">
          <remote-select type="applicant" v-model="form.applicants" multiple></remote-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="年费监控">
          <static-select
            type="renewal_fee_monitor_status"
            v-model="form.renewal_fee_monitor_status"
          ></static-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="商标大类" prop="categories">
      <static-select type="categories" v-model="form.categories" multiple></static-select>
    </el-form-item>
    <el-form-item label="商标小类" prop="sub_categories">
      <el-input v-model="form.sub_categories" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <classify></classify>
    </el-form-item>
    <el-form-item label="商标图形" prop="figure_file">
      <el-upload
        class="avatar-uploader"
        action="/api/files"
        :show-file-list="false"
        :headers="auth"
        :on-success="successUpload"
        :before-upload="beforeUpload"
      >
        <img v-if="form.figure_file" :src="figure_src" alt class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="案件标签">
      <jump-select type="tags" v-model="form.tags" multiple></jump-select>
    </el-form-item>
    <el-form-item label="附件" prop="attachments">
      <upload
        @uploadSuccess="handleUploadSuccess"
        v-model="form.attachments"
        :file-list="attachments"
      ></upload>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input type="text" v-model="form.remark" placeholder="请填写备注"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import Classify from "@/components/page/trademark/TrademarkClassify";
export default {
  name: "trademarkBase",
  props: {
    pageType: {
      type: String,
      default: ""
    }
  },
  computed: {
    auth() {
      return { Authorization: window.localStorage.getItem("token") };
    }
  },
  data() {
    return {
      form: {
        serial: "",
        title: "",
        subtype: "",
        order_serial: "",
        sub_categories: "",
        applicants: [],
        area: this.pageType == "add" ? [] : "",
        categories: [],
        figure_file: "",
        project_stage: "",
        remark: "",
        attachments: [],
        tags: [],
        renewal_fee_monitor_status: ""
      },
      figure_src: "",
      rules: {
        title: { required: true, message: "商标名称不能为空", trigger: "blur" },
        subtype: {
          type: "number",
          required: true,
          message: "商标类型不能为空",
          trigger: "change"
        },
        applicants: {
          type: "array",
          required: true,
          message: "申请人不能为空",
          trigger: "blur"
        },
        sub_categories: {
          required: true,
          message: "商标小类不能为空",
          trigger: "blur"
        },
        categories: {
          type: "array",
          required: true,
          message: "商标大类不能为空",
          trigger: "change"
        }
      },
      attachments: []
    };
  },
  methods: {
    successUpload(p) {
      //处理图片上传成功回调数据
      const d = p.data;
      if (p.status) {
        this.form.figure_file = d.file.id;
        console.log(d);
        this.figure_src = d.file.viewUrl;
      } else {
        this.$message({ message: p.info, type: "warning" });
        // this.$messa(p.info);
      }
    },
    handleUploadSuccess(a, b, c) {
      this.$emit("uploadSuccess", a, b, c);
    },
    beforeUpload(file) {
      const isJPG = file.type; //获取上传文件类型
      if (
        isJPG !== "image/jpeg" &&
        isJPG !== "image/png" &&
        isJPG !== "image/gif"
      ) {
        //判断文件格式
        this.$message.warning("上传商标图片必须是.gif,jpeg,jpg,png格式！");
        return false;
      }
      return isJPG;
    },
    submitForm() {
      return this.$tool.shallowCopy(this.form, { date: true });
    },
    setForm(form) {
      this.$tool.coverObj(this.form, form, {
        obj: ["area", "categories", "subtype"]
      });
    },
    checkForm(callback) {
      let flag = true;
      this.$refs.form.validate(_ => {
        flag = _;
        callback(flag);
      });
    }
  },
  components: { Classify }
};
</script>
<style>
#trademarkAdd .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
#trademarkAdd .avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
#trademarkAdd .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
#trademarkAdd .avatar {
  width: 148px;
  height: 148px;
  display: block;
}
</style>