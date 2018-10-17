const config = [
	['applicant',{
	  URL: '/api/applicants',
	  DATA_KEY: 'applicant',
	  PARAMS: {},
	  FIELDS: [ 
	  	{ label: '姓名', key: 'name' },
	  	{ label: '类型', key: 'type_name' },
	  	{ label: '证件号码', key: 'identity' },
	  	{ label: '地区', key: 'area' },
	  	{ label: '省/市', key: 'province_city' },
	  	{ label: '地址', key: 'address' },
	  	{ label: '费用备案', key: 'fee_discount', render:(h,item)=>{
	  		const val = item == 1 ? '是' : '否';
	  		return h('span',val);
	  	}},
	  ]
	}],	['inventor',{
	  URL: '/api/inventors',
	  DATA_KEY: '',
	  PARAMS: {},
	  FIELDS: [ 
	  	{ label: '姓名', key: 'name' },
	  	{ label: '证件号码', key: 'identity' },
	  	{ label: '地区', key: 'citizenship' },
	  	{ label: '部门', key: 'branch' },
	  	{ label: '部门简称', key: 'abbr' },
	  	{ label: '手机', key: 'mobile' },
	  	{ label: '邮箱', key: 'email' },
	  ]
	}],	['agent',{
	  URL: '/agent',
	  DATA_KEY: 'agent',
	  PARAMS: {},
	  FIELDS: [ 
	  	{ label: '擅长领域', key: 'major' },
	  	{ label: '工作年限', key: 'working_experience' },
	  	{ label: '简介', key: 'introduction' },
	  	{ label: '状态', key: 'status_name' },
	  	{ label: '手机', key: 'mobile' },
	  	{ label: '邮箱', key: 'email' },
	  ]
	}],
];
export default config;