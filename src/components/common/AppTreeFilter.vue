<template>
  <div class="app-tree-filter">
    <static-select
      :type="selectedType"
      v-model="field_key"
      ref="strainerTree"
      :square="true"
      border="bottom"
    ></static-select>
    <el-tree
      :style="{height: (parseInt(height) - 40) + 'px', 'overflow-y':'auto'}"
      :data="data"
      :props="defaultProps"
      highlight-current
      @node-click="refreshTable"
      ref="filterTree"
    ></el-tree>
  </div>
</template>

<script>
import StaticSelect from "@/components/form/StaticSelect";
import { strainerConfig } from "@/const/fieldConfig";
import { mapActions } from "vuex";
// 过滤器后台路由配置
const urlMap = new Map([
  ["process", { URL: "/processes/filters" }],
  ["patent", { URL: "/patents/filters" }],
  ["applicants", { URL: "/applicants/filters" }],
  ["inventors", { URL: "/inventors/filters" }],
  ["contacts", { URL: "/contacts/filters" }],
  ["remarks", { URL: "/remarks/filters" }],
  ["contracts", { URL: "/contracts/filters" }],
  ["invoice_targets", { URL: "/invoice_targets/filters" }],
  ["fees", { URL: "/fees/filters" }],
  ["invoices", { URL: "/invoices/filters" }],
  ["received_payments", { URL: "/received_payments/filters" }],
  ["invoice_request", { URL: "/vouchers/filters" }],
  ["cpc_notice", { URL: "/cpc_notices/filters" }],
  ["cpc_archive", { URL: "/cpc_archives/filters" }],
  ["orders", { URL: "/orders/filters" }],
  ["quotations", { URL: "/quotations/filters" }],
  ["patent_notices", { URL: "/notices/filters" }]
]);
export default {
  name: "filterTree",
  props: {
    type: {
      type: String,
      default: ""
    },
    height: {
      type: Number,
      default: 0
    }
  },
  computed: {
    strainerMap() {
      const map = new Map(strainerConfig);
      return map;
    },
    selectedType() {
      const singleStrainer = this.type ? this.strainerMap.get(this.type) : [];
      return {
        placeholder: "请选择过滤属性",
        options: singleStrainer
      };
    },
    config() {
      const val = this.type ? urlMap.get(this.type) : undefined;
      return val;
    },
    defaultParams() {
      const params = this.$route.meta.params;
      return params ? params : {};
    }
  },
  methods: {
    ...mapActions(["fillListFilter"]),
    refreshTreeData() {
      const url = this.config.URL;
      const data = Object.assign(
        {},
        { filter_key: this.field_key },
        this.defaultParams
      );
      const success = _ => {
        if (_) this.data = _.data;
      };
      this.$axiosGet({ url, data, success });
    },
    refreshTable(data, node) {
      const obj = {};
      const s = this.$refs.strainerTree.getSelected();
      const label = data.name;
      const name = s[0].name;
      const key = s[0].id;
      const value = data.query[key];
      const extraOption = { operation: 1 };
      obj[key] = { label, name, key, value, extraOption };
      this.fillListFilter(obj);
      // this.$emit('refresh',data.query);
    }
  },
  data() {
    return {
      field_key: "",
      data: [],
      defaultProps: {
        children: "children",
        label(d) {
          return `${d.name}(${d.count})`;
        }
      }
    };
  },
  created() {
    this.strainerMap.get(this.type).filter((v, i, arr) => {
      if (v["default"]) this.field_key = v.id;
    });
  },
  watch: {
    field_key: {
      handler(val) {
        this.refreshTreeData();
      },
      deep: true
    }
  },
  components: { StaticSelect }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.app-tree-filter {
  background: #fff;
  border: 1px solid #ebeef5;
  margin-right: 6px;
}
</style>
<style lang="scss">
#app .app-tree-filter .static_select .el-input__inner {
  border-radius: 0px;
  border: none;
  border-bottom: 1px solid rgb(235, 238, 245);
}
#app .app-tree-filter .static_select .el-input__inner:hover {
  border-color: rgb(192, 196, 204);
}
#app .app-tree-filter .static_select .el-input__inner:focus {
  border-color: #409eff;
}
</style>