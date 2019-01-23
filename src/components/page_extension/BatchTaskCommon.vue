<!-- TaskCommon中所有批量操作 -->
<template>
  <div>
    <app-shrink :visible.sync="visible" :title="title">
      <span slot="header" style="float: right;">
      <app-button-loading :func="save" ref="loadingBtn" text="保存"></app-button-loading>
    </span>
      <batch-send-case ref="sendCase" :ids="ids" @hide="hide"></batch-send-case>
    </app-shrink>
  </div>
</template>

<script>
  import BatchSendCase from "@/components/page_extension/BatchSendCase";

  const constType = [
    ["sendCase", "批量派案"],
  ];
  export default {
    name: "BatchTaskCommon",
    data() {
      return {
        visible: false,
        constTypeMap: new Map(constType),
      }
    },
    props: {
      ids: {
        type: Array,
        default() {
          return []
        },
      },
      operationType: {
        type: String,
        default() {
          return ""
        },
      },
    },
    computed: {
      title: function () {
        return this.constTypeMap.get(this.operationType);
      }
    },
    methods: {
      show() {
        this.visible = true;
      },
      hide() {
        this.visible = false;
      },
      save() {
        this.$refs[this.operationType].save();
      }
    },
    components: {
      BatchSendCase
    }
  }
</script>

<style scoped>

</style>