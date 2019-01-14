<template v-loading="loading">
  <div>
    <app-table :columns="columns" :data="delayData"></app-table>
    <el-dialog title="附件" :visible.sync="dialogVisible">
      <app-table :columns="attachmentsColumns" :data="attachments"></app-table>
    </el-dialog>
  </div>
</template>

<script>
import AppTable from "@/components/common/AppTable";
import AxiosMixins from "@/mixins/axios-mixins";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "TaskCommonDelay",
  mixins: [AxiosMixins],
  props: ["row"],
  data() {
    return {
      delayData: [],
      loading: false,
      dialogVisible: false,
      attachments: [],
      columns: [
        { type: "text", label: "操作人", prop: "days" },
        { type: "text", label: "申请时间", prop: "creation_time" },
        { type: "text", label: "延期后期限", prop: "deadline" },
        { type: "text", label: "审批人", prop: "reviewer",render_simple:'name' },
        { type: "text", label: "审批时间", prop: "last_modification_time" },
        { type: "text", label: "状态", prop: "status" },
        { type: "text-btn", label: "附件", prop: "attachments", click: this.handleAttach, render_text_btn: row => {
              return row.attachments[0] ? row.attachments[0].name : "";
        }},
        { type: "text", label: "备注", prop: "remark", min_width: "200" }
      ],
      attachmentsColumns: [
        { type: 'text', label: '文件名称', prop: 'name' },
        { type: 'text', label: '文件类型', prop: 'file_type' },
        { type: 'text', label: '文件格式', prop: 'ext' },
        { type: 'text', label: '文件大小', prop: 'size' },
        { type: 'text', label: '上传人', prop: 'uploader', render_simple: 'name', },
        { type: 'text', label: '上传时间', prop: 'creation_time' },
        { type: 'action',
          width: '178',
          btns: [
            { type: 'download', text: '下载', click: ({downloadUrl})=>{window.open(downloadUrl)} },
            { type: 'view', text: '查看', click: ({viewUrl})=>{window.open(viewUrl)} },
          ]
        }
    ]
  };
},
  computed: {
    taskId() {
      return this.row.task.id;
    }
  },
  methods: {
    ...mapActions([]),
    handleAttach (row) {
      this.dialogVisible = true;
      this.attachments = row.attachments;
    }, 
    refreshData () {
      this.loading = true;
      const url = `/processes/${this.row.id}`;
      const success = _ => {
        this.delayData = _.process.postpones;
      };
      const complete = _ => {
        setTimeout(_ => (this.loading = false), 500);
      };

      this.axiosGet({ url, success, complete });
    }
  },
  created() {},
  watch: {},
  components: {
    AppTable
  }
};
</script>