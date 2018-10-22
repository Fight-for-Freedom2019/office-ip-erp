<!-- 客户列表中的发明人列表 -->
<template>
	<div>
		<table-component :data="inventorData" :tableOption="option" ref="table" @refreshTableData='refreshTableData'></table-component>
		<pop @refresh="refresh" ref="pop" :customer="customer" :presentId = currentId></pop>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import Pop from '@/components/form/InventorPop'
import {mapGetters} from 'vuex'
const URL = '/api/customers';
export default {
	name: 'ClientlistInventor',
	props: ['customer','itemData'],
	data () {
		return {
			option: {
                url: URL,
                is_search: true,
				header_btn: [
					{ type: 'add', click: this.addPop }, 
				],
				columns: [
					{ type: 'selection' },
					{ 
						type: 'text', 
						prop: 'name', 
						label: '发明人姓名',
						width:120
						// render_text: _=>this.caseMap.get(Number.parseInt(_)),
					},
					{ type: 'text', prop: 'subtype', label: '发明人类型', width:120 },
					{ type: 'text', prop: 'citizenship', label: '国籍' },
					{ type: 'text', prop: 'identity', label: '证件号码' },
					{ type: 'text', prop: 'phone_number', label: '电话', width: '160' },
					{ type: 'text', prop: 'email_address', label: '邮箱', width: '160' },
					{ type: 'text', prop: 'family_name', label: '英文姓' },
					{ type: 'text', prop: 'given_name', label: '英文名' },
					{ type: 'text', prop: 'is_publish_name', label: '不公开姓名', width:120 },
					{ 
						type: 'action',
						width: '100',
						align: 'center',
						btns: [
							{ type: 'edit', click:  this.editPop },
							{ type: 'delete', click:  this.clientDelete }
						]
					
					},
				],
				is_pagination: true,
				is_border: false,
                height:"default",
			},
			inventorData: [],
			currentId:{}
		};
	},
	computed: {
		...mapGetters([
			'caseMap',
		]),
	},
	methods: {
		addPop () {
			this.$refs.pop.show();
		},
		refreshTableData(option) {
			const success = _=>{
					this.inventorData = _.inventors.data;  
				}
			this.$axiosGet({
				url: `${URL}/${this.customer.id}/inventors`,
				data: Object.assign({}, option),
				success,
				})
  	    },
		refresh () {
			this.$refs.table.refresh();
		},
		update () {
			this.$refs.table.update();
		},
		editPop (row) {
			this.$refs.pop.show('edit', row);
			this.currentId = row.id
		},
		clientDelete (row) {
			const url = `${URL}/${this.customer.id}/inventors/${row.id}`;
			this.$confirm(
				'此操作将永久删除该邮件, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(()=>{
					const success = _=>{ 
					this.update();
					this.$message({message: '删除发明人成功！', type: 'success'}) 
				};

				this.$axiosDelete({url, success});
				}).catch(()=>{
				this.$message({
					type: 'info',
					message: '已取消删除！'
				})
			})
		},
	},
	watch:{
		itemData(){
			this.inventorData = this.itemData;
			console.log(this.inventorData)
		}
	},
	components: {
		TableComponent,
		Pop,
	},
	
}
</script>