<template>
	<div class="main">
		<div class="filter-visible-body">
			<el-tree
				v-loading="groupLoading"
				class="filter-visible-body-left"
			  :data="groupOptions"
			  :props="defaultProps"
			  highlight-current
			   :default-checked-keys="[1]"
			   node-key="id"
			  @current-change="handleCurrentChange"
			  ref="tree"
			>
			</el-tree>
			<div class="filter-visible-body-right">
				<static-select type="table_type" v-model="tableType" ></static-select>
				<app-transfer-panel v-loading="listLoading" element-loading-text="加载中..." style="width: 100%; margin-top: 10px;"  :is-move="false" title="权限控制" placeholder="查询字段..." :data="fields" v-model="checkedFields"></app-transfer-panel>
				<!-- <app-transfer style="margin-top: 10px;" ref="transfer" title1="有权限" title2="无权限" placeholder="查询字段..." v-model="transferValue"></app-transfer> -->
				<div style="margin-top: 10px;" v-if="currentId != '' && tableType != ''">
					<el-button type="primary" @click="save" :loading="saveLoading">{{ saveLoading ? '保存中....' : '保存' }}</el-button>
					<el-button @click="restore" :disabled="saveLoading">还原</el-button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {mapGetters} from 'vuex';
import {mapActions} from 'vuex';
import {config} from '@/const/fieldConfig'
import StaticSelect from '@/components/form/StaticSelect';
import AppTransferPanel from '@/components/common/AppTransferPanel';

const URL = '/roles';
// const map = new Map(config);

export default {
	name: 'filterVisible',
	data () {
		return {
			defaultProps: {
				label: 'name',
				children: 'children',
			},
			tableType:  'Patent',		
			checkedFields: [],
			fields: [],
			cache: {},
			listLoading: false,
			currentId: '',
			saveLoading: false,
		};
	},
	computed: {
		...mapGetters([
			'groupOptions',
			'groupLoading',
			'usergroups',
		]),
		// fields () {
		// 	const fields = map.get(this.tableType);
		// 	return fields ? fields : [];
		// },
		except: {
			set (val) {
				const map = new Map();
				val.forEach(v => {map.set(v, true)});
				this.checkedFields = this.fields.filter(v => !map.get(v.value)).map(v => v.value);
			},
			get () {
				const map = new Map();
				this.checkedFields.forEach(v => {map.set(v, true)});
				return this.fields.filter(v => !map.get(v.value)).map(v => v.value);
			}
		},
	},
	methods: {
		...mapActions([
			'refreshGroup',
			'refreshUser',
		]),
		async getFields (val) {
			// 采取异步promise先请求字段数据在做权限字段的填充，保证this.fields是最新的值
			await this.refreshFields();
			await this.refreshExcept({group_id: this.currentId, model: val})
		},
		async refreshFields () {
			return new Promise(resolve=>{
			const url = `/model_fields?model=${this.tableType}`;
			const success = _=>{
				this.fields = _.data;
				resolve(true);
			};
			this.$axiosGet({url, success});
				
			})

		},
		async handleCurrentChange (data) {
			this.currentId = data['id'];
			this.refreshExcept({group_id: data['id'], model: this.tableType});
		},
		async refreshExcept ({group_id, model}) {
			if(group_id == '' || model == '') return;
			
			let except = this.cache[group_id][model];
			if(!except) {
				this.listLoading = true;
				try {
					const response = await this.$axiosGet({
						url: `${URL}/${group_id}/except_fields`,
						data: { model },
						success: (data) => {
							except = data.data==null? [] : data.data;
							this.cache[group_id][model] = except; //缓存
						}
					})
				}catch(e) {}
				this.listLoading = false;
			}
			if(except) {
				console.log(except)
				this.except = except;
			}
		},
		async save () {
			const group_id = this.currentId;
			const model = this.tableType;
			const except = this.except;
			if(group_id == '' || model == '') return;
			this.saveLoading = true;
			try {
				this.$axiosPost({
					url: `${URL}/${group_id}/except_fields`,
					data: {role_group_id: group_id, model, except_fields: except},
					success: () => {
						this.$message({type: 'success', message: '保存成功'});
						this.cache[group_id][model] = except;
						if(this.usergroups.indexOf(group_id) > -1) {
							this.refreshUser();
						}
					}
				});
			}catch(e) {}
			this.saveLoading = false;
		},
		restore () {
			const group_id = this.currentId;
			const model = this.tableType;
			if(group_id == '' || model == '') return;
			this.except = this.cache[group_id][model];
		},
	},
	created () {
		this.refreshGroup().then(() => {
			if(this.groupOptions && this.groupOptions.length != 0){
				this.currentId = this.groupOptions[0].id;
			}
			this.groupOptions.forEach(v => {
				this.cache[v.id] = {};
			});
			this.refreshFields();
			this.$nextTick(_=>{
				this.refreshExcept({group_id: this.currentId, model: this.tableType});
			});
		});
	},
	watch: {
		tableType (val) {
			this.getFields(val);
		}
	},
	components: {
		StaticSelect,
		AppTransferPanel,
	},
}
</script>

<style lang="scss">
.filter-visible-body {
	display: -webkit-flex;
  display: flex;
   .el-transfer-panel__list {
    margin: 0;
    padding: 6px 0;
    list-style: none;
    height: 600px;
    overflow: auto;
    box-sizing: border-box;
  }
}

.filter-visible-body-left {
	-webkit-flex: 0 0 auto;
  flex: 0 0 auto;
  width: 200px;
  margin-right: 10px;
  overflow: auto;
}
.filter-visible-body-right {
	-webkit-flex: 1;
  flex: 1;
}
.filter-visible-body-right .el-checkbox-group>label:first-child {
	margin-left: 15px;
}
</style>