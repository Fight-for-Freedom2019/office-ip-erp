const map = new Map([
	['agent',{
		components: 'remote_select',
		type: 'user',
		key: 'agent',
		label: '',
		placeholder: '',
		rules:{ type: 'number', required: true, message: '代理人不能为空', trigger: 'change'},
	}],	
	['remark',{
		components: 'input',
		type: 'textarea',
		key: 'remark',
		label: '',
		placeholder: '',
	}],
]);
export { map };