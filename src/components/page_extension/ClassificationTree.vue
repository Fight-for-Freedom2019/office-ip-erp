<template>
  <div class="classfication-tree" :style="{height: innerHeight-70 + 'px'} ">
    <span style="width: 100%;display:inline-block;border-bottom: 1px solid #ebeef5">
      <span style="float: left;padding: 6px;">技术分类</span>
      <el-button size="mini" icon="el-icon-plus" style="float: right;margin: 6px;" @click="addFirstTree">新增一级分类</el-button>
    </span>
    <el-input placeholder="请输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      :props="defaultProps"
      :data="options"
      node-key="id" 
      :expand-on-click-node="false"
      :render-content="renderContent"  
      :filter-node-method="filterNode"
      highlight-current
      ref="ClassificationTree"
    >
    </el-tree>
    <classification-shrink  ref="classification" :current-id="currentId" :page-type="pageType" @refresh="(str,form,data)=>{refreshData(str,form,data)}"></classification-shrink>
  </div>
</template>

<script>
import ClassificationShrink from '@/components/page_extension/Classification_shrink'
import {mapGetters} from 'vuex'
export default {
  name: 'userTree',
  computed: {
    ...mapGetters([
      'innerHeight',
    ]),    
    pageType () {
      const path = this.$route.path;
      return /classification/.test(path) ? 'classification' : 'product';
    },
    options () {
      const t = this.pageType;
      console.log(this.$store.getters[`${t}Data`])
      return this.$store.getters[`${t}Data`];
    },
    optionMap () {
      const t = this.pageType;
      return this.$store.getters[`${t}Map`];
    },
    url () {
      const t = this.pageType;
      return t == 'classification' ? '/classifications' : '/products';
    },
    dialogTitle () {
      const t = this.pageType;
      return t == 'classification' ? '新增技术分类' : '新增产品';
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    renderContent (h,{node, data, store}) {
      return (
          <span style="flex: 1;display: flex;align-items: center;justify-content: space-between;">
            <span>{node.label+'（'+data.patents_count+'）'}</span>
            <span class={this.treeBtn}>
            <el-button type="text" icon="el-icon-plus" size="mini" onClick={(e)=>{e.stopPropagation();this.addChildTree(node,data,store)}}></el-button>
            <el-button type="text" icon="el-icon-edit" size="mini" onClick={(e)=>{e.stopPropagation();this.editChildTree(node,data,store)}}></el-button>
            <el-button type="text" icon="el-icon-delete" size="mini" onClick={(e)=>{e.stopPropagation();this.deleteChildTree(node,data,store)}}></el-button>
            </span>
          </span>
        )
    },
    refreshData (str, form, data) {
      const node = this.parentNode; 
      const t = this.pageType;
      if(str == 'add') {
        // if(Array.isArray(node.childNodes)) {
        const len = node.childNodes.length;
        const pId = form.parent ? form.parent : this.parentData.id;
        this.$store.commit(`add${t}`,{pId , d: data.classification});
        // }
      }else if(str == 'edit') {
        this.$store.commit(`update${t}`,{d:this.parentData,res:form.name});
      }else {
        this.$store.commit(`addFirst${t}`, data.classification); 
      }
    },
    addFirstTree () {
      this.$refs.classification.show('firstAdd');
    },    
    addChildTree (n, d, s) {
      this.parentNode = n;
      this.parentData = d;
      this.currentId = d.id;
      this.$refs.classification.show('add');
    },
    editChildTree (n, d, s) {
      this.parentNode = n;
      this.parentData = d;
      this.currentId = d.id;
      this.$refs.classification.show('edit',d);
    },  
    deleteChildTree (n, d, s) {
      const t = this.pageType;
      this.$confirm(`删除不可恢复，确定要删除"${d.name}"分类?`,'删除确认',{
        type: 'warning',
      }).then(()=>{

        const url = `${this.url}/${d.id}`;
        const success = _=>{
          this.$store.commit(`remove${t}`, {n,d});
        };

        this.$axiosDelete({ url, success });
      }).catch(()=>{

      });
    },    
  },
  data () {
		return {
		  filterText: '',
      treeBtn: 'tree_btn', 
      parentNode: '',
      parentData: '',     
      filterData: [],
      currentId: '',
      defaultProps: {
        children: 'children',
        label: 'name', 
      },
		}
  },
  watch: {
    filterText(val) {
      this.$refs.ClassificationTree.filter(val);
    }
  },
  components: {
    ClassificationShrink,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.classfication-tree {
  overflow: auto;
  background: #fff;
  border: 1px solid #ebeef5;
  margin-right: 6px;
  flex: 0 0 300px; 
}
</style>
