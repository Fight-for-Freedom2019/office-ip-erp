<template>
  <div>
  	<el-row v-for="(item, index) in value" :key="index" style="margin-bottom: 5px;">
			<el-col :span="7" style="padding-right: 5px;">
        <static-select type="fee_code" :value="item.fee_type" @input="val=>{ handleInput(val, 'fee_type', index) }"></static-select>
			</el-col>
			
			<el-col :span="7" style="padding: 0 5px;">
        <el-input :value="item.amount" @input="val=>{ handleInput(val, 'amount', index) }" placeholder="请填写费用金额"></el-input>
			</el-col>
			
			<el-col :span="7" style="padding: 0 5px; ">
        <static-select type="currency" :value="item.currency" @input="val=>{ handleInput(val, 'currency', index) }"></static-select>
  		</el-col>

			<el-col :span="3" style="padding-left: 5px; ">
				<el-button type="text" size="mini" @click="dataDelete(index)">删除</el-button>
			</el-col>
  	</el-row>
  	<el-row>
  		<el-button type="text" @click="add({ 'fee_type': '', 'amount': '', 'currency': '' })">添加</el-button>
  	</el-row>
  </div>
</template>

<script>
import Multiline from '@/mixins/multiline'
import StaticSelect from '@/components/form/StaticSelect'

export default {
  name: 'feelists',
  mixins: [ Multiline ],
  components: { StaticSelect },
  methods: {
    handleInput (val, key, index) {
      const arr = this.$tool.deepCopy(this.value);
      arr[index][key] = val;          
      this.$emit('input', arr);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
