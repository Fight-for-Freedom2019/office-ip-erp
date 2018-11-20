<template>
	<app-shrink :visible.sync="dialogVisible" :title="title" size="small" @close="$emit('close','')" >
		<el-form ref="form" :model="form" >	
			<el-form-item label="上级分类" prop="parent" v-if="rerender">
				<static-select :type="pageType" v-model="form.parent" :disabled="select_disabled"></static-select>		
			</el-form-item>
			<el-form-item label="分类名称" prop="name">
				<el-input placeholder="请输入分类名称" v-model="form.name"></el-input>
			</el-form-item>
			<el-form-item label="分类描述" prop="description">
				<el-input placeholder="请输入分类描述" v-model="form.description"></el-input>
			</el-form-item>
			<el-form-item style="margin-bottom: 0px;">
				<el-button v-if="type == 'add' || type == 'firstAdd'" type="primary" :disabled="btn_disabled" @click="add">添加</el-button>
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
export default {
	name: 'classification_shrink',
	props: ['currentId','pageType'],
	data () {
		return {
			id: '',
     		type: '',
     		rerender: true,
      		btn_disabled: false,
      		select_disabled: false,
      		dialogVisible: false,
			form: {
				parent: '',
				name: '',
				description: '',
			}
		}
	},
	computed: {
	    URL () {
	    	const t = this.pageType;
	    	return t == 'classification' ? '/classifications' : '/products';
	    },
	    REMINDER_TEXT () {
	    	const t = this.pageType;
	    	return t == 'classification' ? '技术分类' : '产品分类';
	    },
		title () {
			return this.type && (this.type == 'add' || this.type == 'firstAdd') ? `新增${this.REMINDER_TEXT}` : 	`编辑${this.REMINDER_TEXT}`;
		},
	},
	methods: {
		addForm () {
			if(this.type === 'add') {
	 			return this.form;
			}else if (this.type === 'firstAdd') {
				return this.$tool.shallowCopy(this.form, {date: true,skip:['parent']});
			}
		},
		setForm (d) {
			console.log(d);
			if(d.parent_id) {
				this.form.parent = d.parent_id
			}else {
				this.form.parent = '';
				this.select_disabled = true;
			};
			this.$tool.coverObj(this.form,d);
		},
	   show ( type='add', data ) {
	      this.type = type;
	      this.dialogVisible = true;
	      this.select_disabled =false;
	      this.$nextTick(_=>{
	        this.$refs.form.resetFields();
	        this.form.parent = this.currentId;  
	        if(type === 'firstAdd') {
	        	this.form.parent = '';
	        	this.select_disabled = true;
	        }
	        if(type === 'edit') {
	          this.select_disabled = true;
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
	      const url = this.URL
	      const tex = this.REMINDER_TEXT;
	      const data = this.addForm 
	                    ? this.addForm() : this.submitForm 
	                      ? this.submitForm() : this.form;
	      
	      const success = _=>{
	        this.$message({message: `添加${tex}成功`, type: 'success'});
	        this.dialogVisible = false;
	        this.$emit('refresh', this.type, this.form, _);
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
	        this.$emit('refresh', 'edit', this.form, _);
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
	watch: {
		currentId: {
			handler(val) {
				// this.$set(this.form, 'parent', val);
				this.form['parent'] = val;	
				this.rerender = false;
				this.$nextTick(_=>{
					this.rerender = true;
				})
			},
		},
	},
	components: {
		AppShrink,
		StaticSelect,
		RemoteSelect,
	}
}	
</script>
