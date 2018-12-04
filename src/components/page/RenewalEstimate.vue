<template>
	<div class="main">
		<table-component :tableOption="option" :data="tableData" @refreshTableData="refreshTableData" ref="table">
			<el-select v-model="status" slot="status" style="width: 100px;margin-left: 5px;">
				<el-option label="未处理" :value="0"></el-option>
				<el-option label="已处理" :value="1"></el-option>
			</el-select>
		</table-component>
		<detail :row="currentRow" :visible.sync="shrinkVisible" @refresh="update"></detail>
	</div>
</template>
<script>
import TableComponent from '@/components/common/TableComponent'
import Detail from '@/components/page_extension/RenewalEstimate_detail'
const URL = '/renewal_confirmation_sheets';
// const statusMap = new Map([[0, '未处理'], [1, '已处理']]);
export default {
	name: 'renewalEstimate',
	data () {
		return {
			status: 0,
			option: {
				name: 'renewalEstimateList', 
				url: URL,
				height: 'default',
				highlightCurrentRow: true, 
        		rowClick: this.handleRowClick,
       			search_placeholder: '编号、创建人',
				header_btn: [
					{ type: 'delete' },
					{ type: 'control' },
				],
				header_slot: ['status'],
				columns: [
					{ type: 'selection' },
					{ type: 'text', label: '评估单号', prop: 'serial', width: '200' },
					{ type: 'text', label: '创建时间', prop: 'creation_time', width: '145'},
					{ type: 'text', label: '创建人', prop: 'creator', render_simple: 'name', width: '160'},
					{ type: 'text', label: '客户', prop: 'customer', render_simple: 'name', width: '160'},
					{ type: 'text', label: '官方绝限', prop: 'legal_deadline', width: '145'},
					{ type: 'text', label: '最后提醒日', prop: 'last_remind_date', width: '145'},
					{ type: 'text', label: '案件数', prop: 'projects_count', width: '145'},
					{ type: 'text', label: '确认数', prop: 'confirmed_count', width: '145'},
					{ type: 'text', label: '放弃数', prop: 'withdrawn_count', width: '145'},
					{ type: 'text', label: '服务费/件', prop: 'price', width: '145'},
					{ type: 'text', label: '请款单号', prop: 'revenue_invoice', render_simple: 'serial', width: '200'},
					{ 
						type: 'text', 
						label: '评估单状态', 
						prop: 'status',
						// render_text: _=>statusMap.get(_), 
						render_simple: 'name',
						width: '130',
					},
					{ type: 'text', label: '备注', prop: 'remark', min_width: '200'},
				]
			},
			tableData: [{id: 1, serial: '124'}],
			currentRow: {},
			shrinkVisible: false,
		};
	},
	methods: {
		refresh () {
			this.$refs.table.refresh();
		},
		update () {
			this.$refs.table.update();
		},
		refreshTableData (option) {
			this.$axiosGet({
				url: URL,
				data: Object.assign({}, option,),
				success: _=>{this.tableData = _.data},
			})
		},
		handleRowClick (row) {
			this.currentRow = row;
			this.shrinkVisible = true;
		}
	},
	mounted () {
		this.refresh();
	},
	watch: {
		status () {
			this.refresh();	
		}
	},
	components: {
		TableComponent,
		Detail,
	}
} 
</script>