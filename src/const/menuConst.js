//路径取名规则:
//子路径应包含父路径
const menu = {};

const taskMenu = [
	{ type: 'item', text: '我的待办', path: '/task/pending', icon: 'iconfont el-icon-my-task'},
	{ type: 'submenu', text: '我的审核', path: '/task/review', icon: 'iconfont el-icon-my-task', children:[
		{ type: 'item', text: '我发送的', path: '/task/review/send', icon: ''},
		{ type: 'item', text: '待我审核', path: '/task/review/check', icon: ''},
	]},
	{ type: 'submenu', text: '期限管控', path: '/task/monitor', icon: 'iconfont el-icon-my-task', children:[
		{ type: 'item', text: '新申请', path: '/task/monitor/application', icon: '' },
		{ type: 'item', text: '法限案件', path: '/task/monitor/oa', icon: '' },
	] },

];

const patentMenu = [
	{ type: 'item', text: '专利管理', path: '/patent/list', icon: 'iconfont el-icon-my-patent' },
	{ type: 'item', text: '立案管理', path: '/patent/draftbox', icon: 'iconfont el-icon-my-patent' },
	{ type: 'item', text: '通知书管理', path: '/patent/notice', icon: 'iconfont el-icon-my-patent' },
];
const trademarkMenu = [
	{ type: 'item', text: '商标管理', path: '/trademark/list', icon: 'iconfont el-icon-my-trademark' },
	{ type: 'item', text: '立案管理', path: '/trademark/draftbox', icon: 'iconfont el-icon-my-trademark' },
	{
		type: 'item',
		text: '通知书管理',
		path: '/trademark/notice',
		icon: 'iconfont el-icon-my-trademark',
	},
];

const copyrightMenu = [
	{ type: 'item', text: '版权管理', path: '/copyright/list', icon: 'iconfont el-icon-my-copyright' },
	{ type: 'item', text: '版权立案', path: '/copyright/draftbox', icon: 'iconfont el-icon-my-copyright' },
	{
		type: 'item',
		text: '通知书管理',
		path: '/copyright/notice',
		icon: 'iconfont el-icon-my-copyright',
	},
];

const projectMenu = [
	{ type: 'item', text: '项目管理', path: '/project/list', icon: 'el-icon-my-report' },
	{ type: 'item', text: '项目立案', path: '/project/draftbox', icon: 'iconfont el-icon-my-trademark' },
]

const crmMenu = [
	{ type: 'item', text: '客户管理', path: '/crm/customers', icon: 'iconfont el-icon-my-task'},
	{ type: 'item', text: '订单管理', path: '/crm/project', icon: 'iconfont el-icon-my-task'},
	{ type: 'submenu', text: '客户数据', path: '/crm/data', icon: 'iconfont el-icon-my-task', children:[
		{ type: 'item', text: '申请人管理', path: '/crm/data/applicants', icon: 'iconfont icon-proposer' },
		{ type: 'item', text: '发明人管理', path: '/crm/data/inventors', icon: 'iconfont icon-proposer' },
		{ type: 'item', text: '联系人管理', path: '/crm/data/contacts', icon: 'iconfont icon-proposer'},
		{ type: 'item', text: '客户备注', path: '/crm/data/remarks', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '合同管理', path: '/crm/contracts', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '开票信息', path: '/crm/data/bill_info', icon: 'iconfont icon-contract'},
	] },
	{ type: 'submenu', text: '账款管理', path: '/crm/finance', icon: 'iconfont el-icon-my-task', children:[
		{ type: 'item', text: '待请费用', path: '/crm/finance/fee', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '请款管理', path: '/crm/finance/payment_request', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '回款管理', path: '/crm/finance/payment_recevied', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '发票管理', path: '/crm/finance/invoice', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '报价管理', path: '/crm/finance/quotations', icon: 'iconfont icon-contract'},
	] },
	{ type: 'submenu', text: '通知发文', path: '/crm/notice', icon: 'iconfont el-icon-my-task', children:[
		{ type: 'item', text: '官文', path: '/crm/notice/notice', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '报表', path: '/crm/notice/report', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '年费', path: '/crm/notice/renewal', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '快递', path: '/crm/notice/express', icon: 'iconfont icon-contract'},
	] },
	{ type: 'submenu', text: '供应商管理', path: '/crm/suppliers', icon: 'iconfont el-icon-my-task', children:[
		{ type: 'item', text: '供应商管理', path: '/crm/suppliers/list', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '待付费用', path: '/crm/suppliers/fee', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '付款管理', path: '/crm/suppliers/payment', icon: 'iconfont icon-contract'},
		{ type: 'item', text: '报价管理', path: '/crm/suppliers/quotations', icon: 'iconfont icon-contract'},
	]},
];

const financeMenu = [
	{ type: 'item', text: '应收费用', path: '/finance/income', icon: 'iconfont icon-fee-income'},
	{ type: 'item', text: '应付费用', path: '/finance/cost', icon: 'iconfont icon-personel'},
	{ type: 'item', text: '年费管理', path: '/finance/renewal', icon: 'iconfont icon-personel'},
];


const reportMenu = [
	{ type: 'item', text: '点数报表', path: '/report/task', icon: 'el-icon-my-report' },
	{ type: 'item', text: '财务报表', path: '/report/finance', icon: 'el-icon-my-report' },
]

const exchangeMenu = [
	{ type: 'item', text: '文档上传', path: '/exchange/document', icon: 'el-icon-my-patent' },
	{ type: 'item', text: 'CPC通知书手动上传', path: '/exchange/cpc', icon: 'el-icon-my-patent' },
	{ 
		type: 'submenu', 
		text: '客户端同步', 
		path: '/exchange/client',
		icon: 'iconfont el-icon-my-patent',
		children: [
			{ type: 'item', text: '通知书', path: '/exchange/client/notice', icon: '' },
			{ type: 'item', text: '递交包', path: '/exchange/client/filing', icon: '' },
		],
	},
	{ type: 'item', text: '邮件', path: '/exchange/mail', icon: 'el-icon-my-patent' },
];

const dataInsiderMenu = [
	{ type: 'item', text: '摘要', path: '/datainsider/summary', icon: 'el-icon-my-report' },
]


const settingMenu = [
	{ type: 'item', text: '个人设置', path: '/setting/individual', icon: 'iconfont el-icon-my-set-copy' },
	{ type: 'item', text: '用户管理', path: '/setting/userManage', icon: 'iconfont el-icon-my-users' },
	// { type: 'item', text: '组织架构', path: '/setting/branch', icon: 'iconfont el-icon-my-department' },
	{ type: 'item', text: '技术分类管理', path: '/setting/classification', icon: 'iconfont el-icon-my-techonology' },
	{ type: 'item', text: '产品分类管理', path: '/setting/product', icon: 'iconfont el-icon-my-products' },
	// { type: 'item', text: '报价管理', path: '/setting/offer', icon: 'iconfont el-icon-my-organization' },
	{
		text: '字段权限管理',
		path: '/setting/field',
		icon: 'iconfont el-icon-my-set-copy',
		type: 'item',
	},
	{ type: 'item', text: '邮件模板管理', path: '/setting/mail_templates', icon: 'iconfont el-icon-my-products' },
	{ type: 'submenu', text: '流程自定义', path: '/setting/flow', icon: 'iconfont el-icon-my-system',
		children:[
			{type: 'item', text: '管制事项', path: '/setting/flow/definitions', icon: 'iconfont el-icon-my-system'},
			{type: 'item', text: '流程管理', path: '/setting/flow/flows', icon: 'iconfont el-icon-my-system'},
			{type: 'item', text: '流程节点', path: '/setting/flow/actions', icon: 'iconfont el-icon-my-system'},
		]
    },
	{ type: 'submenu', text: '基础数据', path: '/setting/data', icon: 'iconfont el-icon-my-system',
		children:[
			{type: 'item', text: '收款账户', path: '/setting/data/payment_account', icon: 'iconfont el-icon-my-system'},
			{type: 'item', text: '费用代码', path: '/setting/data/fee_codes', icon: 'iconfont el-icon-my-system'},
			{type: 'item', text: '文件类型', path: '/setting/data/file_types', icon: 'iconfont el-icon-my-system'},
			{type: 'item', text: '案件状态', path: '/setting/data/stages', icon: 'iconfont el-icon-my-system'},
			{type: 'item', text: '原始记录', path: '/setting/data/entity_change', icon: 'iconfont el-icon-my-system'},
		]
    },
	{ type: 'item', text: '系统设置', path: '/setting/system', icon: 'iconfont el-icon-my-system' },
];

const homeMenu = []

menu.source = [
	{
		text: '首页',
		key: 'statistics',
		path: '/home',
		menu: homeMenu,
	},
	{
		text: '工作流',
		key: 'task',
		path: '/task',
		icon: 'iconfont el-icon-my-task',
		menu: taskMenu,
	},
	{
		text: '专利',
		key: 'patent',
		path: '/patent',
		icon: 'iconfont el-icon-my-patent',
		menu: patentMenu,
	},
	// {
	// 	text: '商标',
	// 	key: 'trademark',
	// 	path: '/trademark',
	// 	icon: 'iconfont el-icon-my-patent',
	// 	menu: trademarkMenu,
	// },
	// {
	// 	text: '版权',
	// 	key: 'copyright',
	// 	path: '/copyright',
	// 	icon: 'iconfont el-icon-my-copyright',
	// 	menu: copyrightMenu,
	// },
	// {
	// 	text: '项目',
	// 	key: 'project',
	// 	path: '/project',
	// 	icon: 'iconfont el-icon-my-copyright',
	// 	menu: projectMenu,
	// },
	{
		text: 'CRM',
		key: 'crm',
		path: '/crm',
		icon: 'iconfont icon-client',
		menu: crmMenu,
	},
	{
		text: '财务',
		key: 'fees',
		path: '/finance',
		icon: 'iconfont el-icon-my-fee',
		menu: financeMenu,
	},
	// {
	// 	text: '报表',
	// 	key: 'report',
	// 	path: '/report',
	// 	icon: 'el-icon-my-report',
	// 	menu: reportMenu,
	// },
	{
		text: '交互',
		key: 'exchange',
		path: '/exchange',
		icon: 'el-icon-my-report',
		menu: exchangeMenu,
	},
	// {
	// 	text: 'Data Insider',
	// 	key: 'datainsider',
	// 	path: '/datainsider',
	// 	icon: 'iconfont el-icon-my-email',
	// 	menu: dataInsiderMenu,
	// },
	{
		text: '设置',
		key: 'setting',
		path: '/setting',
		icon: 'iconfont el-icon-my-setting',
		menu: settingMenu,
	},
	// {
	// 	text: '测试',
	// 	key: 'test',
	// 	path: '/test',
	// 	icon: '',
	// 	menu: testMenu,
	// }
]

menu.map = {
	'/': {text: '主页', icon: 'iconfont el-icon-my-home', path: '/'},
	'/task/pending/check': {text: '提案审核', icon: 'iconfont el-icon-my-task-check', 'path': '/task/pending/check'},
	'/patent/applied/detail': {text: '专利详情', icon: '', path: '/patent/applied/detail'},
	'/patent/list/detail': {text: '专利详情', icon: '', path: '/patent/list/detail'},
	'/copyright/list/detail': {text: '版权详情', icon: '', path: '/copyright/list/detail'},
	'/proposal/edit': {text: '提案编辑', icon: '', path: '/proposal/edit'},
	'/proposal/detail': {text: '提案详情', icon: '', path: '/proposal/detail'},
	'/trademark/list/detail': {text: '商标详情', icon: '', path: '/trademark/list/detail/babel'},
	'/news/mailList/mailAdd': {text: '写邮件', icon: 'el-icon-edit', path: '/news/mailList/mailAdd'},
	'/news/mailList/mailEdit': {text: '编辑邮件', icon: 'el-icon-edit', path: '/news/mailList/mailEdit'},
	'/setting/agency/detail': {text: '代理机构详情', icon: '', path: '/setting/agency/detail'},
	'/setting/template/edit': {text: '编辑模板', icon: 'el-icon-edit', path: '/setting/template/edit'},
	'/news/systemMessage/detail': {text: '消息详情', icon: '', path: '/news/systemMessage/detail'},

	'/proposal/add': {text: '新建提案', icon: '', path: '/proposal/add'},
	'/patent/add': {text: '新建专利', icon: '', path: '/patent/add'},
	'/trademark/add': {text: '新建商标', icon: '', path: '/trademark/add'},
	'/copyright/add': {text: '新建版权', icon: '', path: '/copyright/add'},

	'/report/task/add': {text: '新建报表', icon: '', path: '/report/task/add'},
	'/report/proposal/add': {text: '新建报表', icon: '', path: '/report/proposal/add'},
	'/report/patent/add': {text: '新建报表', icon: '', path: '/report/patent/add'},
	'/report/trademark/add': {text: '新建报表', icon: '', path: '/report/trademark/add'},
	'/report/copyright/add': {text: '新建报表', icon: '', path: '/report/copyright/add'},
	'/report/fee/add': {text: '新建报表', icon: '', path: '/report/fee/add'},
	'/report/invoice/add': {text: '新建报表', icon: '', path: '/report/invoice/add'},

};

const tailRecursion = (data) => {
	for( let x of data ) {
		if(!x["path"]) continue;
		const path = x['type'] && x['type'] == 'submenu' ? '' : x["path"];
		menu["map"][x["path"]] = { text: x["text"], icon: x["icon"], path };
		if( x.children && x.children.length != 0) {
			tailRecursion(x["children"]);
		}
	}
}

for(let k in menu.source) {
	const item = menu.source[k];
	const text = item["text"] ? item["text"] : '';
	const icon = item["icon"] ? item["icon"] : '';
	const path = item["path"];
	const parent = '/';
	menu["map"][item["path"]] = { text, icon, path, parent };
	if(item['menu'] && item['menu']['length'] != 0) {
		tailRecursion(item['menu']);
	}
}

export default menu;
