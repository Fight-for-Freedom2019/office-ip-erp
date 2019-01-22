<template>
  <div>
<!--   	<el-tag
		v-for="(tag, index) in projectsValue"
		:key="index"
		closable
		disable-transitions
		style="margin-right: 5px;"
		@close="handleCloseTag(index)"
  	>
  		<span>{{ tag['id']['name'] }}</span>
  	</el-tag> -->
  	<app-card :value="olditems" type="relateProjects" @handleCloseTag="handleCloseTag"></app-card>
  	<el-button type="text" @click="relativeVisible = true">{{ pageType == 'add' ? '添加' : '修改'}}</el-button>
  	<el-dialog :visible.sync="relativeVisible" title="编辑相关案件" :modal="false">
  		<el-row v-for="(item,index) in items" :key="index" style="margin-bottom: 5px">
	  		<el-col :span="6" style="padding-right: 5px">
	  			<!-- <el-select placeholder="案件类型" v-model="items[index].reference_type" >
				    <el-option 
				    	v-for="item in options"
				    	:key="item.value"
				    	:label="item.label"
				    	:value="item.value"
				    ></el-option>
				  </el-select>
 -->				  
 			<static-select type="relative_projects_type" v-model="items[index].reference_type"></static-select>
	  		</el-col>
	  		<el-col :span="16" style="padding: 0 5px">
	  			<jump-select type="专利" :value-key="`key-${index}`" v-model="items[index].id" :ref="`relativeProjects`" :para="customer"></jump-select>
	  		</el-col>
	  		<el-col :span="2" style="padding-left: 5px">
	  			<el-button type="text" size="mini" @click="deleteRow(index)">删除</el-button>
	  		</el-col>
		</el-row>
		<el-button type="text" @click="addRow">添加案件引用</el-button>
		<el-row>
			<el-button type="primary" @click="handleAddTag">确认</el-button>
			<el-button @click="relativeVisible = false">取消</el-button>
		</el-row>
	</el-dialog>		
  </div>
</template>

<script>
import Multiline from '@/mixins/multiline'
import RemoteSelect from '@/components/form/RemoteSelect'
import JumpSelect from '@/components/form/JumpSelect'
import StaticSelect from '@/components/form/StaticSelect'
import AppCard from '@/components/common/AppCard'

export default {
  name: 'relativeProjects',
  mixins: [ Multiline ],
	data () {
		return {
			// options: [
			// 	{ label: '要求优先权', value: 1 },
			// 	{ label: '分案申请', value: 2 },
			// 	{ label: '部分连续案', value: 3 },
			// ],
			relativeVisible: false,
			items:[],
			olditems:[],
		}
	},
	props: {
		customer:Object,
	},
	methods: {
		addRow() {
			this.items.push({'id': '', 'reference_type': '',})
		},
		deleteRow(index) {
			this.items.splice(index, 1);
		},
		handleAddTag () {
			this.olditems = this.$tool.deepCopy(this.items);
			// 将值通过事件emit出去 实现绑值
			this.$emit('input', this.olditems) 
			for(let i=0;i<this.olditems.length;i++) {
				const ref = this.$refs.relativeProjects;
				if (ref !== undefined) {
					const selected = ref[i].getSelected();
					if (selected.length > 0) {
						const s = selected[0];
						const id = s && s.id ? s.id : '';
						const name = s && s.name ? s.name : '';
						this.olditems[i]['id'] = {id,name};
					}
				}
			}
			this.relativeVisible = false;
		},
		handleCloseTag (index) {
			this.items.splice(index, 1);
			this.olditems.splice(index, 1);
		},
	},
	watch: {
		value : {
			handler: function(v) {
				this.items = this.$tool.deepCopy(this.value);
				this.olditems = this.$tool.deepCopy(this.value);
			}
		},
	},
	components: { RemoteSelect, JumpSelect, AppCard, StaticSelect },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
