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
  	<app-card :value="projectsValue" type="relateProjects" @handleCloseTag="handleCloseTag"></app-card>
  	<el-button type="text" @click="relativeVisible = true">{{ pageType == 'add' ? '添加' : '修改'}}</el-button>
  	<el-dialog :visible.sync="relativeVisible" title="编辑相关案件" :modal="false">
  		<el-row v-for="(item,index) in value" :key="index" style="margin-bottom: 5px">
	  		<el-col :span="6" style="padding-right: 5px">
	  			<el-select placeholder="案件类型" :value="item.type" @input="val=>{ handleInput(val, 'type', index) }">
				    <el-option 
				    	v-for="item in options"
				    	:key="item.value"
				    	:label="item.label"
				    	:value="item.value"
				    ></el-option>
				  </el-select>
	  		</el-col>
	  		<el-col :span="16" style="padding: 0 5px">
	  			<jump-select type="专利" :value-key="`key__${index}`" :value="item['project']['id']" @input="val=>{ handleProjects(val, index)}" ref="relativeProjects"></jump-select>
	  		</el-col>
	  		<el-col :span="2" style="padding-left: 5px">
	  			<el-button type="text" size="mini" @click="dataDelete(index)">删除</el-button>
	  		</el-col>
		</el-row>
		<el-button type="text" @click="add({'project': {id: '', name: ''}, 'type': ''})">添加相关案件</el-button>
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
import AppCard from '@/components/common/AppCard'

export default {
  name: 'relativeProjects',
  mixins: [ Multiline ],
	data () {
		return {
			options: [
				{ label: '要求优先权', value: 1 },
				{ label: '分案申请', value: 2 },
				{ label: '部分连续案', value: 3 },
				{ label: '同套发明与新型', value: 4 },
				{ label: '不同地区同族', value: 5 },
				{ label: '要求同日送件', value: 6 },
			],
			relativeVisible: false,
			projectsValue: [],
		}
	},
	methods: {
		handleProjects (val, index) {
			const selected = this.$refs['relativeProjects'][0].map.get(val);
			console.log(selected)
			const id = selected && selected.id ? selected.id : '';
			const name = selected && selected.name ? selected.name : '';
			const type = this.value[index]['type'];
			// this.projectsValue.push({'id':{'id':id, 'name': name}, type:type})
			// this.$emit('input',[{'id':{'id':id, 'name': name}, type:type}]);
		  	const arr = this.$tool.deepCopy(this.value);
	  		arr[index]['project']['id'] = id;
	  		arr[index]['project']['name'] = name;
	  		arr[index]['type'] = type;
	  		this.$emit('input', arr);	
		},
		handleAddTag () {
			this.projectsValue = this.$tool.deepCopy(this.value);
			this.relativeVisible = false;
		},
		handleCloseTag (index) {
			const arr = this.$tool.deepCopy(this.value);
			arr.splice(index, 1);
			this.$emit('input', arr);
		},
	},
	watch: {
		value (val) {
			console.log(val);
			this.projectsValue = val;
			if(val[0] && val[0]['name']) {
				let arr;
				arr = val.map(_=>{ return {project: { id: _.id, name: _.name }, type: _.type} });
				this.$nextTick(_=>{ this.$emit('input', arr); });				
			}
		}
	},
	components: { RemoteSelect, JumpSelect, AppCard },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
