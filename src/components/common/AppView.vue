<template>
  <div style="background: #fff; border: 1px solid #ebeef5;">
    <div style="width: 200px;background: #fff;">
      <span style="width: 100%;display:inline-block;border-bottom: 1px solid #ebeef5">
        <span style="float: left;padding: 6px;">表格视图</span>
          <i class="el-icon-plus" @click="handleAdd" style="float: right; padding: 6px; margin-top:5px;margin-right:5px;color:#409EFF;cursor: pointer;" title="新建视图"></i>
      </span>
      <el-input placeholder="请输入关键字进行过滤" v-model="filterText"></el-input>
  </div>
  <div class="view-tree" :style="{overflow: 'auto',height: height-76 + 'px'}">
    <el-tree
      :props="defaultProps"
      :data="MergeOptions"
      node-key="id" 
      :expand-on-click-node="false"
      :render-content="renderContent"  
      :filter-node-method="filterNode"
      highlight-current
      :current-node-key="setCurrent"
      @node-click="handleNodeRefresh"
      ref="viewTree"
    >
    </el-tree>
  </div>
  <view-pop :type="type" :visible="viewVisible" v-model="fields" :default="choose" @close="v=>viewVisible = false" ref="viewPop"></view-pop>
  </div>  
</template>

<script>
import ViewPop from '@/components/common/ViewPop'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
const URL = '/table_views';
export default {
  name: 'viewTree',
  props: {
    value: {
      type: Array,
      default () {
        return [];
      }
    },
    height: {
      type: [String, Number],
    },
  },
  computed: {
    ...mapGetters([
      'innerHeight',
      'viewOptions',
    ]),    
    pageType () {
      const path = this.$route.path;
      return path;
    },
    MergeOptions () {
      const defaultView = [{id: 0, name: '默认视图'}];
      return [...this.viewOptions, ...defaultView]
    },
    fields: {
      set(val) {
        let v = this.$tool.deepCopy(this.value);
        v = val;
        this.$emit('input', v);
      },
      get() {
        if(this.value && this.value instanceof Array) {
          return this.value;
        }else {
          return [];
        }
      },
    },
  },
  methods: {
    ...mapActions([
      'refreshView',
    ]),
    handleTransition () {
      this.show = false;
      this.$nextTick(_=>{
        this.show = true;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    renderContent (h,{node, data, store}) {
      return (
          <span style="flex: 1;display: flex;align-items: center;justify-content: space-between;">
            <span>{node.label}</span>
            <span class={this.treeBtn}>
            <el-button type="text" title="编辑" disabled={!data.id} icon="el-icon-edit" size="mini" onClick={(e)=>{e.stopPropagation();this.editChildTree(node,data,store)}}></el-button>
            <el-button type="text" title="删除" disabled={!data.id} icon="el-icon-delete" size="mini" onClick={(e)=>{e.stopPropagation();this.deleteChildTree(node,data,store)}}></el-button>
            </span>
          </span>
        )
    },
    handleNodeRefresh (data, node) {
      if(data.id){
       this.$emit('deliver', data);
      }else {
        this.$emit('reset');
      }
    },   
    handleAdd () {
      this.type = 'add';
      this.viewVisible = true;
      this.$nextTick(_=>{
        this.$refs.viewPop.clear();
      })
    },
    editChildTree (n, d, s) {
      console.log(d)
      this.currentId = d.id;
      this.choose = d.param.selectedFields.split(',');
      this.fields = d.param.allFields;
      this.$refs.viewPop.setData(d);
      this.type = 'edit';
      this.viewVisible = true;

    },
    deleteChildTree (n, d, s) {
      const page = this.pageType;
      this.$confirm(`删除不可恢复，确定要删除"${d.name}"分类?`,'删除确认',{
        type: 'warning',
      }).then(()=>{
        const url = URL;
        const data = {id: d.id};
        const success = _=>{
          this.$message({ type: 'success', message: _.info });
          this.refreshView({page})
        };

        this.$axiosDelete({ url, data, success });
      }).catch(()=>{

      });
    },    
  },
  data () {
    return {
      filterText: '',
      show: true,
      treeBtn: 'tree_btn',     
      filterData: [],
      currentId: '',
      setCurrent: '',
      choose: [],
      loading: false,
      type: '',
      viewVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name', 
      },
    }
  },
  created () {
    this.refreshView({page: this.pageType})
  },
  watch: {
    filterText(val) {
      this.$refs.viewTree.filter(val);
    }
  },
  components: {
    ViewPop,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.view-tree {
  overflow: auto;
  background: #fff;
  margin-right: 6px;
  flex: 0 0 200px; 
  width: 200px;
}
.fade-enter-active, .fade-leave-active {
  transition: all .5s ease;
}
.fade-enter, .fade-leave-to {
  transform: rotate(-180deg);
}
</style>
<style>
  #app .view-tree .el-tree-node__children {
  overflow: inherit;
}
</style>