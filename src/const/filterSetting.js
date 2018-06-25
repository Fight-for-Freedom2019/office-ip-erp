const map = new Map([
	['task', [
		{ components: 'static_select', id: 'category', name: '案件类型', type: 'case_type' },
  	{ components: 'static_select', id: 'ipr', name: 'IPR', type: 'ipr' },
		{ components: 'remote_select', id: 'agency', name: '代理机构', type: 'agency' },
		{ components: 'remote_select', id: 'agent', name: '代理人', type: 'agent' },
		{ components: 'static_select', id: 'flow_node_id', name: '流程节点', type: 'flow_node' },
		{ components: 'remote_select', id: 'person_in_charge', name: '承办人', type: 'member' },
  	{ components: 'date',          id: 'due_time', name: '指定期限' },
  	{ components: 'date',          id: 'deadline', name: '官方绝限' },
  	{ components: 'date',          id: 'end_time', name: '完成时间' },
    { components: 'date',          id: 'apd', name: '申请日' },
    { components: 'date',          id: 'inner_deadline', name: '管控期限' },
	]],
	['proposal', [
		{ components: 'input',         id: 'title', name: '提案标题' },
    { components: 'static_select', id: 'classification', name: '技术分类', type: 'classification' },
    { components: 'static_select', id: 'product', name: '产品分类', type: 'product' },
    { components: 'static_select', id: 'branch', name: '部门', type: 'branch' },
    { components: 'static_select', id: 'ipr', name: 'IPR', type: 'ipr' },
    { components: 'remote_select', id: 'inventors', name: '发明人', type: 'inventor' },
    { components: 'remote_select', id: 'proposer', name: '提案人', type: 'member' },
    { components: 'static_select', id: 'tags', name: '标签', type: 'tag' },
    { components: 'date',          id: 'create_time', name: '提案时间' },
	]],
	['patent', [
		{ components: 'static_select', id: 'type', name: '专利类型', type: 'patent_type' },
		{ components: 'static_select', id: 'area', name: '申请地区', type: 'area' },
		{ components: 'date',          id: 'apd', name: '申请日' },
		{ components: 'static_select', id: 'progress', name: '当前进度', type: 'progress' },
		{ components: 'date',          id: 'create_time', name: '立案日' },
		{ components: 'remote_select', id: 'agency', name: '代理机构', type: 'agency' },
		{ components: 'remote_select', id: 'agent', name: '代理人', type: 'agent' },
		{ components: 'remote_select', id: 'proposer', name: '提案人', type: 'member' },
		{ components: 'static_select', id: 'ipr', name: 'IPR', type: 'ipr' },
		{ components: 'static_select', id: 'tags', name: '标签', type: 'tag' },
		{ components: 'static_select', id: 'classification', name: '技术分类', type: 'classification' },
		{ components: 'static_select', id: 'product', name: '产品分类', type: 'product' },
		{ components: 'static_select', id: 'branch', name: '部门', type: 'branch' },
		{ components: 'date',          id: 'issue_date', name: '授权日' },
		{ components: 'date',          id: 'public_date', name: '公开日' },
		{ components: 'remote_select', id: 'applicants', name: '申请人', type: 'applicant' },
		{ components: 'remote_select', id: 'inventors', name: '发明人', type: 'inventor' },
		{ components: 'input',         id: 'group_number', name: '群组号' },
		{ components: 'input',         id: 'project_number', name: '项目编号' },
		{ components: 'input',         id: 'family_number', name: '' },
	]],
	['trademark', [
		{ components: 'static_select', id: 'type', name: '商标类型', type: "trademark_type" },
		{ components: 'static_select', id: 'area', name: '地区', type: 'area' },
		{ components: 'static_select', id: 'categories', name: '商标类别', type: 'categories' },
		{ components: 'remote_select', id: 'applicants', name: '申请人', type: 'applicant'  },
		{ components: 'date',          id: 'apd', name: '申请日' },
		{ components: 'date',          id: 'public_date', name: '初审公告日' },
		{ components: 'date',          id: 'issue_date', name: '核准注册日' },
		{ components: 'date',          id: 'expiring_date', name: '专用权期限' }
	]],
	['copyright', [
		{ components: 'static_select', id: 'type', name: '版权类型', type: 'copyright_type' },
		{ components: 'remote_select', id: 'proposer', name: '提案人', type: 'member'},
		{ components: 'remote_select', id: 'applicant', name: '申请人', type: 'applicant' },
		{ components: 'remote_select', id: 'agent', name: '代理人', type: 'agent' },
		{ components: 'remote_select', id: 'agency', name: '代理机构', type: 'agency' },
		{ components: 'static_select', id: 'product', name: '产品分类', type: 'product' },
		{ components: 'static_select', id: 'tag', name: '标签', type: 'tag' },
		{ components: 'date',          id: 'apd', name: '申请日' },
		{ components: 'date',          id: 'issue_date', name: '公告日' },
	]],
	['fee', [
		{ components: 'remote_select', id: 'target', name: '费用对象', type: 'member' },
    { components: 'static_select', id: 'code', name: '费用代码', type: 'fee_code' },
    { components: 'date',          id: 'mail_date', name: '通知书发文日' },
    { components: 'date',          id: 'create_time', name: '费用生成日期' },
    { components: 'date',          id: 'due_time', name: '账单期限' },
    { components: 'date',          id: 'deadline', name: '官方绝限' },
    { components: 'date',          id: 'pay_time', name: '付款时间' },
    { components: 'static_select', id: 'category', name: '案件类型', type: 'case_type' },
    { components: 'static_select', id: 'patent_type', name: '专利类型', type: 'patent_type' },
    { components: 'date',          id: 'apd', name: '申请日' },
    { components: 'static_select', id: 'area', name: '地区', type: 'area' },
	]],
	['invoice', [
		{ components: 'static_select', id: 'status', name: '账单状态', type: 'invoice_type' },
    { components: 'remote_select', id: 'target', name: '账单对象', type: 'member' },
    { components: 'date',          id: 'create_time', name: '账单生成日期' },
    { components: 'date',          id: 'due_time', name: '费用期限' },
    { components: 'date',          id: 'pay_time', name: '付款时间' },
	]]
])

const customPathMap = new Map([
	['task', '/task/custom'],
	['proposal', '/proposal/custom'],
	['patent', '/patent/custom'],
	['trademark', '/trademark/custom'],
	['copyright', '/copyright/custom'],
	['fee', '/fee/custom'],
])

const listPathMap = new Map([
	['task', '/task/pending'],
	['proposal', '/proposal/list'],
	['patent', '/patent/list'],
	['trademark', '/trademark/list'],
	['copyright', '/copyright/list'],
	['fee', '/fee/income'],
])

export {map, customPathMap, listPathMap};