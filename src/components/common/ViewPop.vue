<template>
	<el-dialog :visible.sync="dialogVisible" title="专利原始视图" @close="close">
		<el-form label-width="80px" :rules="rules" :model="form" ref="form">
			<el-form-item label="原始视图字段" prop="fields">
				<app-transfer-panel v-model="form.fields" placeholder="请输入关键字查询字段" :data.sync="fieldData" title="原始视图字段控制"  style="width: 100%;"></app-transfer-panel>
			</el-form-item>
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入视图名称"></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="remark">
				<el-input  v-model="form.remark" placeholder="请输入备注"></el-input>
			</el-form-item>
			<el-form-item label="查询条件" v-if="type == 'edit'">
				<el-tag
				v-for="tag in queryAll"
				:key='tag.key'
				closable
				@close="handleClose(tag)"
				style="margin-right: 6px;"
				>
					{{ `${tag.name}：${tag.label}`}}
				</el-tag>
				<el-button type="text" @click="_=>{filterVisible = true;setTrigger('pop')}">添加</el-button>
			</el-form-item>
			<el-form-item style="margin-bottom: 0px;">
				<el-button type="primary" @click="submitView" :disabled="disabled">{{this.type == 'add'? '新建' : '保存'}}</el-button>
				<el-button @click="close">取消</el-button>
			</el-form-item>
		</el-form>
		<template>
			<app-list-filter :visible.sync="filterVisible" type="patent" :refresh="refresh"></app-list-filter>
		</template>
	</el-dialog>
</template>
<script>
import AppTransferPanel from '@/components/common/AppTransferPanel'
import AppListFilter from '@/components/common/AppListFilter'
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
const URL = '/table_views';
export default {
	name: 'viewPop',
	props: {
		'value': {
			type: Array,
			default () {
				return [];
			}
		},
		'default': {
			type: Array,
			default () {
				return [];
			},
		},
		'filter': {
			type: null,
			default () {
				return {};
			}
		},
		'visible': {
			type: Boolean,
			default: false,
		},
		'type': String,
	},
	data () {
		const fields = this.default;
		return {
			id: '',
			form: {
				fields,
				name: '',
				remark: '',
			},
			query: [],
			loading: false,
			dialogVisible: false,
			disabled: false,
			filterVisible: false,
			sortedFields: [],
			rules: {
				fields: {type: 'array', required: true, message: '请选择视图字段', trigger: 'change'},
				name: { required: true, message: '请输入视图名称', trigger: 'blur'},
			}
		};
	},
	computed: {
		...mapGetters([
			'listFilter',
			'viewFilter',
		]),
		defaultParams () {
			const params = this.$route.meta.params;
			return params ? params : {};
		},
		pageType () {
			const path = this.$route.path;
			return path;
		},
		queryAll () {
			return [...this.query, ...this.viewFilter];	
		}, 
		fieldData: {
			set(val) {
				let v = this.$tool.deepCopy(this.value);
				v = val;
				this.$emit('input', v);
			},
			get() {
				if(this.value && this.value instanceof Array) {
					return this.value;
				}else {
					return [];
				}
			},
		},
	},
	methods: {
		...mapActions([
			'refreshView',
			'clearViewFilter',
			'removeViewFilter',
			'setTrigger',
		]),
		setData(d) {
			this.id = d.id;
			this.query = d.param && d.param.query ? this.$tool.deepCopy(d.param.query) : []; 
			this.$tool.coverObj(this.form, d, {skip: ['fields']});			
		},
		handleClose(tag) {
			if(this.query.indexOf(tag) != -1) {
        		this.query.splice(this.query.indexOf(tag), 1);
			}else {

				this.removeViewFilter(this.viewFilter.indexOf(tag))
				window.listFilter.clearUsedFormField(tag['key'])
			}
      	},
      	refresh() {

      	},
		close() {
			this.clearViewFilter();
			this.$emit('close', false)
		},
		submitView () {
			this.$refs.form.validate(_=>{
				if(_){
					this.loading = true;
					this.disabled = true;
					const page = this.pageType;
					const query =  this.$tool.rmDuplicate([...this.listFilter,  ...this.query, ...this.viewFilter]);
					const param = Object.assign({},{fields: this.sortedFields.join(',')}, {query});
					const url = this.type == 'add' ? URL : `${URL}/${this.id}`;
					const data = {
						...this.$tool.shallowCopy(this.form,{skip:['fields']}),
						param,
						page,
					};
					const success = d=>{
						this.$message({type: 'success', message: d.info});
						this.refreshView({ page });
					};
					const complete = d=>{
						this.loading = false;
						this.disabled = false;
						this.$emit('close', false)
					};
					this.type == 'add'? this.$axiosPost({url, data, success, complete }) : 
					this.$axiosPut({url, data, success, complete});		
				}
			})
		},
	},
	created() {
	},
	watch: {
		default (val) {
			this.form.fields = val;
		},
		visible(v) {
			this.dialogVisible = v;
		},
		'fieldData': {
			handler(val) {
			this.sortedFields = [];
			const fields = this.form.fields;
			val.filter(_=>{
				for(let item of fields) {
					const flag = fields.indexOf(_['key']);
					if(flag > -1) {
						return this.sortedFields.push(_['key']);
					}
				}
			});
			},
			immediate: true,	
		},
	},
	components: {
		AppTransferPanel,
		AppListFilter,
	}
}
</script>	