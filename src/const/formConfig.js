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
	}]
]);
export { map };