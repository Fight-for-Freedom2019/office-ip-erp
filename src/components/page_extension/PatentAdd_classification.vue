<template>
  <!-- <app-collapse col-title="分类信息"> -->
      <el-form label-width="120px">
        <el-form-item label="部门">
          <branch v-model="form.organization_unit" count-type="patent" ></branch>
          <!-- <span v-else>{{ branchName ? branchName : '暂未归属某个部门' }}</span> -->
        </el-form-item>
				<el-form-item label="产品分类">
					<product v-model="form.products" count-type="patent" multiple></product>
				</el-form-item>
				<el-form-item label="技术分类">
					<classification v-model="form.classification" count-type="patent"></classification>
				</el-form-item>
      </el-form>
    <!-- </app-collapse> -->
</template>

<script>
import AppCollapse from '@/components/common/AppCollapse'
import Branch from '@/components/form/Branch'
import Product from '@/components/form/Product'
import Classification from '@/components/form/Classification'
import StaticSelect from '@/components/form/StaticSelect'

export default {
  name: 'patentAddClassification',
  data () {
		return {
			form: {
        organization_unit: '',
				products: [],
				classification: '',
			}
    }
  },
  methods: {
  	setForm (data) {
      this.$tool.coverObj(this.form, data, {obj: ['organization_unit', 'products', 'classification',]});
  	},
    submitForm () {
      return this.form;
    },
    checkForm (callback) {
      callback(true);
    },
  },
  components: { AppCollapse,Branch, Product, Classification, StaticSelect }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>