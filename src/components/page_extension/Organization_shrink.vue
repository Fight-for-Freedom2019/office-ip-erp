<template>
	<app-shrink :visible.sync="dialogVisible" :title="title" size="small" @close="$emit('close','')">
		<el-form ref="form" :model="form">	
			<el-form-item label="部门名称" prop="name" v-if="roleType == 'organization'">
				<el-input v-model="form.name" placeholder="请输入部门名称"></el-input>
			</el-form-item>			
			<el-form-item label="角色组名称" prop="name" v-else-if="roleType == 'rolegroups'">
				<el-input v-model="form.name" placeholder="请输入角色组名称"></el-input>
			</el-form-item>			
			<el-form-item label="角色名称" prop="name" v-else-if="roleType == 'roles'">
				<el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
			</el-form-item>
			<el-form-item label="部门描述" prop="description" v-if="roleType == 'organization'">
				<el-input v-model="form.description" placeholder="请输入部门描述"></el-input>
			</el-form-item>
			<el-form-item label="部门主管" prop="supervisor" v-if="roleType == 'organization'">
				<remote-select type="user" v-model="form.supervisor" placeholder="请选择部门主管"></remote-select>
			</el-form-item>
			<el-form-item style="margin-bottom: 0px;">
				<el-button v-if="type == 'add'" type="primary" :disabled="btn_disabled" @click="add">添加</el-button>
				<el-button v-if="type == 'edit'" type="primary" :disabled="btn_disabled" @click="edit">编辑</el-button>
			</el-form-item>
		</el-form>
	</app-shrink>
</template>

<script>
import AppShrink from '@/components/common/AppShrink'	
import PopMixins from '@/mixins/pop-mixins'
import StaticSelect from '@/components/form/StaticSelect'
import RemoteSelect from '@/components/form/RemoteSelect'
const map = new Map([
	['organization',{
		url: '/organization_units',
		reminder_text: '部门',
	}],	
	['rolegroups',{
		url: '/role_groups',
		reminder_text: '角色组',
	}],	
	['roles',{
		url: '/roles',
		reminder_text: '角色',
	}],
]);
export default {
	name: 'organization_shrink',
	props: ['currentId','roleType'],
	data () {
		return {
			id: '',
     		type: '',
      		btn_disabled: false,
      		dialogVisible: false,
			form: {
				name: '',
				description: '',
				supervisor: '',
			}
		}
	},
	computed: {
		URL () {
			return this.roleType ? map.get(this.roleType).url : '';
		},
		REMINDER_TEXT () {
			return this.roleType ? map.get(this.roleType).reminder_text : '';
		},
		title () {
			return this.type && this.type == 'add' ? `新增${this.REMINDER_TEXT}` : 	`编辑${this.REMINDER_TEXT}`;
		},
	},
	methods: {
		addForm () {
			if(this.roleType == 'organization') {
				return Object.assign({'parent': this.currentId}, this.form);
			}else if (this.roleType == 'roles') {
				return Object.assign({'roles_group_id': this.currentId}, this.form);
			}else{
				return this.form.name;
			}
		},
		setForm (d) {
			this.$tool.coverObj(this.form,d);
		},
	   show ( type='add', data ) {
	      this.type = type;
	      this.dialogVisible = true;
	      this.$nextTick(_=>{
	        this.$refs.form.resetFields();  
	        
	        if(type === 'edit' || type === 'confirm') {
	          if(data instanceof Object) {
	            const copy = this.$tool.deepCopy(data);
	            this.id = copy.id; 
	            this.setForm ? this.setForm(data) : this.$tool.coverObj(this.form, copy);  
	          }else if(data instanceof String || data instanceof Number) {
	            data -= 0;
	          }         
	        }
	      });
	    },
	    add () {
	      const url = this.URL;
	      const tex = this.REMINDER_TEXT;
	      const data = this.addForm 
	                    ? this.addForm() : this.submitForm 
	                      ? this.submitForm() : this.form;
	      
	      const success = _=>{
	        this.$message({message: `添加${tex}成功`, type: 'success'});
	        this.dialogVisible = false;
	        this.$emit('refresh', 'add',this.form,_);
	      }
	      const complete = _=>{
	        this.btn_disabled = false;
	      }
	      this.$refs.form.validate(_=>{
	        if(_) {
	          this.btn_disabled = true;
	          this.$axiosPost({url, data, success, complete});
	        }
	      })      
	    },
	    edit () {
	      const url = `${this.URL}/${this.id}`;
	      const tex = this.REMINDER_TEXT;
	      const data = this.editForm 
	                    ? this.editForm() : this.submitForm 
	                      ? this.submitForm() : this.form;
	      const success = _=>{
	        this.$message({message: `编辑${tex}成功`, type: 'success'});
	        this.dialogVisible = false;
	        this.$emit('refresh', 'edit',this.form,_);
	      }
	      const complete = _=>{
	        this.btn_disabled = false;
	      }

	      this.$refs.form.validate(_=>{
	        if(_) {
	          this.btn_disabled = true;
	          this.$axiosPut({url, data, success, complete});        
	        }  
	      })
	    }	
	},
	components: {
		AppShrink,
		StaticSelect,
		RemoteSelect,
	}
}	
</script>
