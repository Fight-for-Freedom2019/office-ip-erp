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
const URL = '/customers';
export default {
	name: 'CustomerListInventor',
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
                    { type: 'text', label: '姓名', prop: 'name', width: '150' },
                    { type: 'text', label: '尊称', prop: 'title', width: '150' },
                    { type: 'text', label: '所属客户', prop: 'customer.name', width: '150' },
                    { type: 'text', label: '国籍', prop: 'citizenship', sortable: true, width: '80' },
                    { type: 'text', label: '邮件地址', prop: 'email_address', width: '145' },
                    { type: 'text', label: '电话号码', prop: 'phone_number',width: '120' },
                    { type: 'text', label: '证件号码', prop: 'identity', width:'150'},
                    { type: 'text', label: '是否公开姓名', prop: 'is_publish_name', width: '130' },
                    { type: 'text', label: '英文名', prop: 'first_name', min_width: '120' },
                    { type: 'text', label: '英文姓', prop: 'last_name',width: '120' },
                    { type: 'text', label: '备注', prop: 'remark',width: '200' },
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
				is_border: true,
                height:"customerList",
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
					this.inventorData = _.data.data;
				}
			this.$axiosGet({
				url: `${URL}/${this.customer.id}/inventors`,
				data: Object.assign({}, option),
				success,
				})
  	    },
		refresh () {
			this.refreshTableData();
		},
		update () {
			this.refreshTableData();
		},
		editPop (row) {
		    let copy = this.$tool.deepCopy(row);
            copy.is_publish_name === "是"?copy.is_publish_name = 1 : 0;
			this.$refs.pop.show('edit', copy);
			this.currentId = copy.id
		},
		clientDelete (row) {
			const url = `/inventors?id[]=${row.id}`;
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