<template>
  <app-shrink :visible.sync="shrinkVisible" :modal='true' title="编辑专利">
    <span slot="header" style="float: right;">
      <el-button type="primary" @click="save" size="small">保存</el-button>
    </span>
    <patent-add page-type="edit" ref="patentAdd"></patent-add>
  </app-shrink>
</template>

<script>
import AppShrink from '@/components/common/AppShrink'
import PatentAdd from '@/components/page/PatentAdd'
import { mapActions } from 'vuex'

export default {
  name: 'patentShrink',
  data () {
    return {
      shrinkVisible: false,
    }
  },
  methods: {
    ...mapActions([
      'refreshDetailData',
    ]),
    save() {
      this.$refs.patentAdd.edit();
    },
    show(id, type='patent') {
      if (!id) return;
      this.refreshDetailData({id, type});
      this.shrinkVisible = true;
    },
  },
  components: {
    AppShrink,
    PatentAdd,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>