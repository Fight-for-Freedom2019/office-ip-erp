<template>
  <div style="background: #fff; border: 1px solid #ebeef5;">
    <div style="width: 200px;background: #fff;">
      <span style="width: 100%;display:inline-block;border-bottom: 1px solid #ebeef5">
        <span style="float: left;padding: 6px;">表格视图</span>
        <transition name="fade">
          <i class="el-icon-refresh" v-if="show" @click="_=>$emit('reset')"  @mouseleave="handleTransition"  style="float: right; padding: 6px; margin-top:5px;margin-right:5px;color:#409EFF;cursor: pointer;" title="重置视图" ></i>
        </transition>
      </span>
      <el-input placeholder="请输入关键字进行过滤" v-model="filterText"></el-input>
  </div>
  <div class="view-tree">
    <el-tree
      :props="defaultProps"
      :data="viewOptions"
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
  <view-pop type="edit" :visible="viewVisible" :fields="fields" :default="choose" @close="v=>viewVisible = false" ref="viewPop"></view-pop>
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
    fields: {
      type: Array,
      default () {
        return [];
      }
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
            <el-button type="text" title="编辑" icon="el-icon-edit" size="mini" onClick={(e)=>{e.stopPropagation();this.editChildTree(node,data,store)}}></el-button>
            <el-button type="text" title="删除" icon="el-icon-delete" size="mini" onClick={(e)=>{e.stopPropagation();this.deleteChildTree(node,data,store)}}></el-button>
            </span>
          </span>
        )
    },
    handleNodeRefresh (data, node) {
      this.$emit('deliver', data);
    },   
    editChildTree (n, d, s) {
      this.currentId = d.id;
      this.choose = d.param.fields.split(',');
      this.$refs.viewPop.setData(d);
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