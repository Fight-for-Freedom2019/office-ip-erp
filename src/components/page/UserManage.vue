<template>
  <div style="display: flex;">
    <template>
      <user-tree
        style="flex:0 0 200px;"
        @refresh="handleTree"
        @close="()=>$refs.edit.dialogVisible=false"
      ></user-tree>
    </template>
    <template>
      <table-component
        :tableOption="option"
        :data="tableData"
        @refreshTableData="refreshTableData"
        ref="table"
        style="overflow: auto;"
      ></table-component>
    </template>
    <edit ref="edit" @refresh="handleRefresh"></edit>
  </div>
</template>
<script>
import TableComponent from "@/components/common/TableComponent";
import UserTree from "@/components/common/UserTree";
import Edit from "@/components/page_extension/UserManage_edit";
import { mapMutations } from "vuex";
const URL = "/users";
export default {
  name: "userManage",
  data() {
    return {
      option: {
        url: URL,
        name: "userManage",
        height: "default",
        // is_pagination: false,
        // 'is_search': false,
        rowClick: this.handleRowClick,
        list_type: "user_manage",
        header_btn: [
          {
            type: "add",
            label: "添加成员",
            click: () => {
              this.addShrink();
            }
          },
          {type: 'delete'}
        ],
        columns: [
          { type: "selection" },
          {
            type: "array",
            label: "用户组",
            prop: "roles",
            render: _ => {
              return _.map(_ => _.name);
            },
            width: "110",
            render_header: true
          },
          {
            type: "array",
            label: "所属部门",
            prop: "organization_units",
            render: _ => {
              return _.map(_ => _.name);
            },
            width: "110",
            render_header: true
          },
          {
            type: "text",
            label: "是否激活",
            prop: "is_active",
            width: "100",
            render: (h, item) => {
              item = item == true ? "是" : "否";
              return h("span", item);
            },
            render_header: true
          },
          { type: "text", label: "名称", prop: "name", width: "90" },
          { type: "text", label: "用户名", prop: "user_name", width: "145" },
          { type: "text", label: "邮箱", prop: "email_address", width: "145" },
          { type: "text", label: "电话", prop: "phone_number", width: "125" },
          {
            type: "text",
            label: "导师",
            prop: "mentor",
            render_simple: "name",
            width: "80"
          },
          {
            type: "text",
            label: "固定薪",
            prop: "is_fixed_salary",
            render: (h, item, row) => {
              return item ? h("span", "是") : h("span", "否");
            },
            width: "80"
          },
          {
            type: "text",
            label: "POP服务器",
            prop: "pop_server",
            width: "120"
          },
          {
            type: "text",
            label: "POP端口",
            prop: "pop_port",
            width: "80"
          },
          {
            type: "text",
            label: "SMTP服务器",
            prop: "smtp_server",
            width: "120"
          },
          {
            type: "text",
            label: "SMTP端口",
            prop: "smtp_port",
            width: "90"
          },
          {
            type: "text",
            label: "使用SSL",
            prop: "is_ssl",
            width: "90",
            render: (h, item) => {
              item = item == true ? "是" : "否";
              return h("span", item);
            }
          },
          {
            type: "text",
            label: "创建人",
            prop: "creator_user",
            render_simple: "name",
            width: "90"
          },
          {
            type: "text",
            label: "创建时间",
            prop: "creation_time",
            width: "110"
          },
          // {
          //   type: "action",
          //   label: "操作",
          //   width: "100",
          //   align: "center",
          //   btns: [
          //     {
          //       type: "edit",
          //       click: row => {
          //         this.editShrink(row);
          //       }
          //     },
          //     { type: "delete", click: this.deleteSingle }
          //   ]
          // }
        ]
      },
      tableData: [],
      nodeData: "",
      roleType: ""
    };
  },
  methods: {
    ...mapMutations(["setPageSize"]),
    addShrink() {
      this.$refs.edit.show("add");
    },
    editShrink(row) {
      this.$refs.edit.show("edit", row);
    },
    handleTree(val, type) {
      this.nodeData = val;
      this.roleType = type;
      this.refresh();
    },
    handleRefresh() {
      this.refresh();
    },
    handleRowClick(row) {
       this.editShrink(row);
    },
    refreshTableData(option) {
      const url = URL;
      const data = Object.assign({}, option,);
      // if (this.roleType === "organization") {
      //   data.organization_units = this.nodeData.id;
      // } else if (this.roleType === "rolegroups") {
      //   data.roles = this.nodeData.id;
      // }
      const success = _ => {
        console.log(_);
        this.tableData = _.data;
      };
      this.$axiosGet({ url, data, success });
    },
    deleteSingle(e, s) {
      console.log(s)
      const url = `${URL}/${s[0].id}`;
      const success = _ => {
        this.$message({ message: "删除用户成功！", type: "success" });
        this.refresh();
      };

      this.$confirm(
        `删除后不可恢复，确认删除用户‘${s[0].user_name}’？`,
        "删除确认",
        { type: "warning" }
      )
        .then(_ => {
          this.$axiosDelete({ url, success });
        })
        .catch(_ => {});
    },
    refresh() {
      this.$refs.table.refresh();
    }
  },
  mounted() {
    this.refresh();
  },
  components: {
    TableComponent,
    UserTree,
    Edit
  }
};
</script>
<style lang="scss" scoped>
</style>