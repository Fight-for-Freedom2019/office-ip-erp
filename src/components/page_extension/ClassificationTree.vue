<template>
  <div class="classfication-tree" :style="{height: innerHeight-70 + 'px'} ">
    <span style="width: 100%;display:inline-block;border-bottom: 1px solid #ebeef5">
      <span style="float: left;padding: 6px;">技术分类</span>
      <el-button size="mini" icon="el-icon-plus" style="float: right;margin: 6px;">新增一级分类</el-button>
    </span>
    <el-input placeholder="请输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      :props="defaultProps"
      :data="options"
      node-key="id" 
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      highlight-current
      ref="ClassificationTree"
    >
    </el-tree>
    <organization-shrink  ref="organization" ></organization-shrink>
  </div>
</template>

<script>
import OrganizationShrink from '@/components/page_extension/Organization_shrink'
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
      return this.$store.getters[`${t}Data`];
    },
    optionMap () {
      const t = this.pageType;
      return this.$store.getters[`${t}Map`];
    },
    url () {
      const t = this.pageType;
      return t == 'classification' ? '/classifications' : '/productclassifies';
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
  },
  data () {
		return {
		  filterText: '',
      radio: 'organization',
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
    OrganizationShrink,
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
