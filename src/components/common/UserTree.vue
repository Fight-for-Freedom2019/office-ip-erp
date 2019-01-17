<template>
  <div class="user-manage__tree">
    <div ref="inputGroup" style="width:300px;background: #fff;border: 1px solid #ebeef5">
      <el-input placeholder="请输入关键字进行过滤" v-model="filterText" class="user-tree__input"></el-input>
      <div style="position: relative;padding: 5px 0 5px; text-align: center;width: 100%;">
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="organization">组织架构</el-radio-button>
          <el-radio-button label="rolegroups">角色</el-radio-button>
        </el-radio-group>
      </div>
      <div style="text-align: center; padding-bottom: 5px;" v-if="radio==='rolegroups'">
        <el-button size="mini" icon="el-icon-plus" @click="addRoleGroups">新增角色组</el-button>
      </div>
    </div>
    <div class="user-tree" :style="{height: innerHeight-inputGroupHeight + 'px'} ">
      <el-tree
        v-if="switchTree"
        :props="defaultProps"
        :data="filterData"
        node-key="id"
        highlight-current
        :expand-on-click-node="false"
        :load="handleLoadNode"
        lazy
        :render-content="renderContent"
        :filter-node-method="filterNode"
        @node-click="refreshUserListData"
        ref="userTree"
      ></el-tree>
      <organization-shrink
        :role-type="type"
        :current-id="currentId"
        ref="organization"
        @refresh="(str,form,val)=>{refreshTreeData(parentNode,str,form,val.data)}"
        @close="_=>{setType = ''}"
      ></organization-shrink>
    </div>
  </div>
</template>

<script>
import OrganizationShrink from "@/components/page_extension/Organization_shrink";
import { mapGetters, mapActions } from "vuex";
const urlMap = new Map([
  [
    "organization",
    {
      URL: "/organization_units",
      DATA_KEY: "branches"
    }
  ],
  [
    "rolegroups",
    {
      URL: "/role_groups",
      DATA_KEY: "data"
    }
  ],
  [
    "roles",
    {
      URL: "/roles",
      DATA_KEY: "data"
    }
  ]
]);
export default {
  name: "userTree",
  computed: {
    ...mapGetters(["innerHeight"]),
    URL() {
      return this.radio ? urlMap.get(this.radio)["URL"] : "";
    },
    DATA_KEY() {
      return this.radio ? urlMap.get(this.radio)["DATA_KEY"] : "";
    },
    type: {
      get() {
        let val = "";
        if (!this.setType) {
          if (this.radio === "organization") {
            return val = "organization";
          } else if (
            this.radio === "rolegroups" &&
            this.parentNode.level == 1
          ) {
            return val = "rolegroups";
          } else if (
            this.radio === "rolegroups" &&
            this.parentNode.level == 2
          ) {
            return val = "roles";
          }
        } else {
          return this.setType;
        }
      },
      set(v) {
        return this.setType = v;
      }
    }
    /*inputGroupHeight(){
      const a = this.radio;
      return this.$refs.inputGroup.clientHeight;
    },*/
  },
  methods: {
    ...mapActions([
      'addListFilter',
      'removeListFilter',
    ]),
    addRoleGroups() {
      this.$emit("close");
      this.$refs.organization.show("add");
      this.type = "rolegroups";
    },
    filterNode(value, d, n) {
      const keyword = value;

      if (!keyword) {
        n.store.lazy = true;
        n.store.defaultExpandAll = false;
        return true;
      } else {
        const url = this.radio === "rolegroups" ? "/roles" : this.URL;
        const data_key = this.radio === "rolegroups" ? "data" : this.DATA_KEY;
        const data = { keyword };
        const success = _ => {
          n.store.lazy = false;
          n.store.defaultExpandAll = true;
          this.filterData = _[data_key];
        };
        this.$axiosGet({ url, data, success });
      }
    },
    refreshTreeData(node, str, form, children) {
      if (str == "add") {
        const oldChildren = node.childNodes;
        oldChildren.splice(0, oldChildren.length);

        if (!node.isLeaf) {
          node.doCreateChildren(children);
          // this.$refs.userTree.updateKeyChildren(node.data.id,children)
        } else {
          node.doCreateChildren(children);
          node.isLeaf = false;
        }
      } else if (str == "edit") {
        node.data = children;
        this.$emit("refresh", node.data, this.radio);
      }
    },
    handleLoadNode(node, resolve) {
      this.parentNode = node;
      if (node.level === 0) return this.loadRootNode(resolve);
      if (node.level >= 1) {
        this.loadChildrenNode(node, resolve);
      }
    },
    loadRootNode(resolve) {
      const data_key = this.DATA_KEY;
      const url = this.URL;
      const data = this.radio == "organization" ? { parent_id: 0 } : {};

      const success = _ => {
        const data = _.data.data;
        resolve(data);
      };

      const error = _ => {
        resolve([]);
      };

      this.$axiosGet({ url, data, success, error });
    },
    loadChildrenNode(node, resolve) {
      const url =
        this.radio == "organization" ? this.URL : urlMap.get("roles")["URL"];
      const data_key =
        this.radio == "organization"
          ? this.DATA_KEY
          : urlMap.get("roles")["DATA_KEY"];
      const data =
        this.radio == "organization"
          ? { parent_id: node.data.id }
          : { role_group: node.data.id };

      const success = _ => {
        const data = _.data.data;
        resolve(data);
      };

      const error = _ => {
        resolve([]);
      };

      this.$axiosGet({ url, data, success, error });
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1;display: flex;align-items: center;justify-content: space-between;">
          <span>{node.label}</span>
          <span class={this.treeBtn}>
            {this.radio == "rolegroups" && node.level == 2 ? (
              <span />
            ) : (
              <el-button
                type="text"
                title="添加"
                icon="el-icon-plus"
                size="mini"
                onClick={e => {
                  e.stopPropagation();
                  this.addChildTree(node, data, store);
                }}
              />
            )}
            <el-button
              type="text"
              title="编辑"
              icon="el-icon-edit"
              size="mini"
              onClick={e => {
                e.stopPropagation();
                this.editChildTree(node, data, store);
              }}
            />
            <el-button
              type="text"
              title="删除"
              icon="el-icon-delete"
              size="mini"
              onClick={e => {
                e.stopPropagation();
                this.deleteChildTree(node, data, store);
              }}
            />
          </span>
        </span>
      );
    },
    refreshUserListData(data) {
      /*判断是否是首次点击*/
      if (this.lastIndex != data.id) {
        console.log(data)
        this.removeListFilter(0)
        const name = this.radio == 'organization' ? '组织架构' : '角色';
        const label = data.name;
        const key = this.radio == 'organization' ? 'organization_units' : 'roles';
        const value = data.id;
        const extraOption = { operation: 1 };
        const obj = { name, label, key, value, extraOption };
        this.addListFilter(obj);
        // this.$emit("refresh", data, this.radio);
      } else {
        return false;
      }
      this.lastIndex = data.id;
    },
    addChildTree(n, d, s) {
      this.currentId = d.id;
      this.parentNode = n;
      if (this.radio === "rolegroups" && n.level == 1) {
        this.type = "roles";
      }
      this.$emit("close");
      this.$refs.organization.show("add");
    },
    editChildTree(n, d, s) {
      this.currentId = d.id;
      this.parentNode = n;
      if (this.radio === "rolegroups" && n.level == 1) {
        this.setType = "";
      }
      this.$emit("close");
      this.$refs.organization.show("edit", d);
    },
    remove(node, data) {
      const children = node.parent.childNodes;

      for (var i = 0; i < children.length; i++) {
        var td = children[i];
        if (td.data.id == data.id) {
          children.splice(i, 1);
          if (children.length == 0) {
            node.parent.isLeaf = true;
          }
          return;
        }
      }
    },
    deleteChildTree(n, d, s) {
      this.$confirm("确定要删除当前节点?", "删除确认", {
        type: "warning"
      })
        .then(() => {
          const url =
            this.radio === "rolegroups" && n.level == 2
              ? `/roles/${d.id}`
              : `${this.URL}/${d.id}`;
          const success = _ => {
            this.remove(n, d);
            this.$emit("refresh", d, this.radio);
          };

          this.$axiosDelete({ url, success });
        })
        .catch(() => {});
    },
    getInputGroupHeight() {
      return this.$refs.inputGroup.clientHeight + this.containerNavHeight;
    }
  },
  data() {
    return {
      containerNavHeight: 62, // .container-nav的高
      inputGroupHeight: "",
      filterText: "",
      lastIndex: "",
      radio: "organization",
      filterData: [],
      treeBtn: "tree_btn",
      currentId: "",
      parentNode: "",
      switchTree: true,
      isLazy: true,
      setType: "",
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "is_leaf"
      }
    };
  },
  watch: {
    radio(val) {
      this.switchTree = false;
      if(this.$refs.organization.dialogVisible) this.$refs.organization.close();
      this.$nextTick(_ => {
        this.switchTree = true;
        this.inputGroupHeight = this.getInputGroupHeight();
      });
    },
    filterText(val) {
      // this.$refs.userTree.filter(val);
      this.filterNode(val, null, this.parentNode);
    }
  },
  mounted() {
    this.inputGroupHeight = this.getInputGroupHeight();
  },
  components: {
    OrganizationShrink
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user-tree {
  display: flex;
  overflow: auto;
  background: #fff;
  border: 1px solid #ebeef5;
  margin-right: 6px;
  flex: 0 0 300px;
  flex-wrap: wrap;
  align-content: flex-start;
  width: 300px;
}
</style>
<style>
#app .user-tree .el-tree {
  width: 100%;
}
#app .user-tree .el-tree-node__children {
  overflow: inherit;
}
#app .user-manage__tree .el-input.user-tree__input .el-input__inner {
  border-radius: 0px;
  border: none;
  border-bottom: 1px solid #dcdfe6;
}
#app .user-manage__tree .el-input.user-tree__input .el-input__inner:hover{
    border-color: rgb(192, 196, 204);
}
#app .user-manage__tree .el-input.user-tree__input .el-input__inner:focus{
    border-color: #409EFF;
}
</style>
