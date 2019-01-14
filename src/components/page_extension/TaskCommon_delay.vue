<template v-loading="loading">
  <app-table :columns="columns" :data="delayData"></app-table>
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
      columns: [
        { type: "text", label: "操作人", prop: "creator_user",render_simple:'name' },
        { type: "text", label: "申请时间", prop: "creation_time" },
        { type: "text", label: "延期后期限", prop: "deadline" },
        { type: "text", label: "审批人", prop: "reviewer",render_simple:'name' },
        { type: "text", label: "审批时间", prop: "last_modification_time" },
        { type: "text", label: "状态", prop: "status",render_simple:'name' },
        { type: "text", label: "备注", prop: "remark", min_width: "200" }
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
    refreshData() {
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