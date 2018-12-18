const map = new Map([
	['single_user_select',{
		components: 'remote_select',
		type: 'user',
		rules:{ type: 'number', required: true, message: '代理人不能为空', trigger: 'change'},
	}],	
	['input',{
		components: 'input',
		type: 'text',
	}],	
	['multiple_attachments',{
		components: 'upload',
	}],
	['order_detail',{
		components: 'panel',
		type: 'order',
	}],
	['payment_request_detail',{
		components: 'panel',
		type: 'payment_request',
	}],
	['outgo_payment_detail',{
		components: 'panel',
		type: 'outgo_payment',
	}],
	['voucher_detail',{
		components: 'panel',
		type: 'voucher',
	}],
	['sensitive_operation_detail',{
		components: 'panel',
		type: 'sensitive_operation',
	}],
	['cpc_editor',{
		components: 'panel',
		type: 'cpc_editor',
	}],
]);
export { map };