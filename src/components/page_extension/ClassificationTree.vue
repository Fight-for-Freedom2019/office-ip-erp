<template>
  <div>
    <div style="width: 300px;background: #fff;">
      <span style="width: 100%;display:inline-block;border-bottom: 1px solid #ebeef5">
        <span style="float: left;padding: 6px;">{{ treeTitle }}</span>
        <el-button size="mini" icon="el-icon-plus" style="float: right;margin: 6px;" @click="addFirstTree">新增一级分类</el-button>
      </span>
      <el-input placeholder="请输入关键字进行过滤" v-model="filterText"></el-input>
  </div>
  <div class="classfication-tree" :style="{height: innerHeight-155 + 'px'} ">
    <el-tree
      :props="defaultProps"
      :data="options"
      node-key="id" 
      :expand-on-click-node="false"
      :render-content="renderContent"  
      :filter-node-method="filterNode"
      highlight-current
      :current-node-key="setCurrent"
      @node-click="handleNodeRefresh"
      ref="ClassificationTree"
    >
    </el-tree>
    <classification-shrink  ref="classification" :current-id="currentId" :page-type="pageType" @refresh="(str,form,data)=>{refreshData(str,form,data)}"></classification-shrink>
  </div>
  </div>  
</template>

<script>
 const MessageContent = {
  
  render (h) {
    
    const model = {
      props: {
        value: this.mergeId,
      },
      on: {
        input: (v) => {
          this.mergeId = v; 
          this.$emit('refreshId', v);
        } 
      }
    };

    const items =  this.messageOptions.map((item,index)=>{
    return <el-option key={index} value={item.id} label={item.name}></el-option>
  });     
    return (
        <span>
          <span>目标分类：</span>
          <el-select {...model}>
            {items}
          </el-select>
         </span>
      )
  },
  data () {
    return {
      mergeId: '',
    }
  },
  props: ['pageType','messageOptions'],
  computed: {
  },
}  
import ClassificationShrink from '@/components/page_extension/Classification_shrink'
import StaticSelect from '@/components/form/StaticSelect'
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
      console.log(this)
      return this.$store.getters[`${t}Data`];
    },
    optionsData () {
      const t = this.pageType;
      return this.$store.getters[`${t}Options`];
    },
    optionMap () {
      const t = this.pageType;
      return this.$store.getters[`${t}Map`];
    },
    url () {
      const t = this.pageType;
      return t == 'classification' ? '/classifications' : '/products';
    },
    treeTitle () {
      const t = this.pageType;
      return t == 'classification' ? '技术分类' : '产品分类';
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    renderContent (h,{node, data, store}) {
      const count = data.patents_count ? data.patents_count : 0
      return (
          <span style="flex: 1;display: flex;align-items: center;justify-content: space-between;">
            <span>{node.label+'（'+count+'）'}</span>
            <span class={this.treeBtn}>
            <el-button type="text" title="添加" icon="el-icon-plus" size="mini" onClick={(e)=>{e.stopPropagation();this.addChildTree(node,data,store)}}></el-button>
            <el-button type="text" title="编辑" icon="el-icon-edit" size="mini" onClick={(e)=>{e.stopPropagation();this.editChildTree(node,data,store)}}></el-button>
            <el-button type="text" title="删除" icon="el-icon-delete" size="mini" onClick={(e)=>{e.stopPropagation();this.deleteChildTree(node,data,store)}}></el-button>
            <el-button type="text" title="合并" icon="el-icon-sort" size="mini" onClick={(e)=>{e.stopPropagation();this.mergeChildTree(node,data,store)}}></el-button>
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
        this.$store.commit(`add${t}`,{pId , d: data[t]});
        // }
      }else if(str == 'edit') {
        this.$store.commit(`update${t}`,{d:this.parentData,res:form.name});
      }else {
        this.$store.commit(`addFirst${t}`, data[t]); 
      }
    },
    handleNodeRefresh (data, node) {
      if(typeof data == 'number') {
        console.log(this.optionMap)
        data = this.optionMap.get(data);
        console.log(data)
      }
      this.setCurrent = data.id;
      // this.$emit('input',data);
      this.$emit('deliver', data);
    },
    addFirstTree () {
      this.$refs.classification.show('firstAdd');
    },    
    addChildTree (n, d, s) {
      console.log(n)
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
    mergeChildTree (n, d, s) {
      const h = this.$createElement;    
      let targetId = '';
      const t = this.pageType;
      this.$msgbox({
        title: '合并分类',
        message: h('message-content', {
          props: {
            pageType:  this.pageType,
            messageOptions: this.optionsData, 
          },
          on: {
            refreshId(val) {
              targetId = val;
            }, 
          },
          ref: 'messageContent'
        }),
        confirmButtonText: '确定',
        showCancelButton: true,
      }).then(action => {
        const url = `${this.url}/${d.id}/merge/${targetId}`;
        const success = _=>{
          // this.$store.commit(`add${t}`,{pId: targetId, d: n.childNodes});
          this.$store.commit(`remove${t}`, {n,d});
          if(t=='classification') {
            this.$store.dispatch('refreshClassification')
          }else {
            this.$store.dispatch('refreshProduct')
          }
        };
        this.$axiosPut({url, success});
      }).catch(action =>{
      });      
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
      setCurrent: '',
      defaultProps: {
        children: 'children',
        label: 'name', 
      },
		}
  },
  mounted () {
    setTimeout(_=>{
      this.$emit('deliver', this.options[0])
    },500)
  },
  watch: {
    filterText(val) {
      this.$refs.ClassificationTree.filter(val);
    }
  },
  components: {
    ClassificationShrink,
    MessageContent,
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
  width: 300px;
}
</style>
<style>
  #app .classfication-tree .el-tree-node__children {
  overflow: inherit;
}
</style>