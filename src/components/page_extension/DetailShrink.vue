<template>
  <app-shrink :visible.sync="shrinkVisible" :modal='true' :title="pageType =='add'? '新增': '编辑'">
    <span slot="header" style="float: right;">
      <el-button type="primary" v-if="pageType == 'edit'" @click="save" size="small">保存</el-button>
      <app-button-loading :func="add" v-if="pageType == 'add'" ref="loadingBtn"></app-button-loading>
    </span>
    <patent-add :page-type="pageType" v-if="showType == 'patent'" ref="patentAdd" @addSuccess="$emit('addSuccess')"></patent-add>
    <trademark-add :page-type="pageType" v-if="showType == 'trademark'" ref="trademarkAdd" @addSuccess="_=>{shrinkVisible = false;$emit('addSuccess')}"></trademark-add>
    <copyright-add :page-type="pageType" v-if="showType =='copyright'" ref="copyrightAdd" @addSuccess="$emit('addSuccess')"></copyright-add>
  </app-shrink>
</template>

<script>
import AppShrink from '@/components/common/AppShrink'
import PatentAdd from '@/components/page/PatentAdd'
import TrademarkAdd from '@/components/page/TrademarkAdd'
import CopyrightAdd from '@/components/page/CopyrightAdd'
import { mapActions } from 'vuex'

export default {
  name: 'detailShrink',
  props: {
    pageType: String,
  },
  data () {
    return {
      shrinkVisible: false,
      showType: '',
    }
  },
  methods: {
    ...mapActions([
      'refreshDetailData',
    ]),
    add() {
       this.$refs[`${this.showType}Add`].add();
    },
    save() {
      this.$refs[`${this.showType}Add`].edit();
    },
    show(id, type='patent') { 
       this.showType = type;
       this.shrinkVisible = true;
      if (this.pageType == 'add') {
        this.$nextTick(_=>{
          this.$refs[`${type}Add`].clear(); 
        })
      }else {
        this.refreshDetailData({id, type});
      }
    },
  },
  components: {
    AppShrink,
    PatentAdd,
    TrademarkAdd,
    CopyrightAdd,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>