//路径取名规则:
//子路径应包含父路径
const menu = {};

const taskMenu = [
  {
    type: "item",
    text: "我的待办",
    path: "/task/pending",
    icon: "iconfont el-icon-my-task"
  },

  {
    type: "submenu",
    text: "我的审核",
    path: "/task/review",
    icon: "iconfont el-icon-my-review",
    children: [
      {
        type: "item",
        text: "我发送的",
        path: "/task/review/sent",
        icon: "iconfont el-icon-my-send"
      },
      {
        type: "item",
        text: "待我审核",
        path: "/task/review/my",
        icon: "iconfont el-icon-my-received"
      }
    ]
  },
  {
    type: "submenu",
    text: "我的关注",
    path: "/task/monitor",
    icon: "iconfont el-icon-my-star",
    children: [
      {
        type: "item",
        text: "我为派案人",
        path: "/task/monitor/assigner",
        icon: "iconfont el-icon-my-assign"
      },
      {
        type: "item",
        text: "我为代理人",
        path: "/task/monitor/agent",
        icon: "iconfont el-icon-my-people"
      },
      // {
      //   type: "item",
      //   text: "我为代理人助理",
      //   path: "/task/monitor/assistant",
      //   icon: "iconfont el-icon-my-proposer"
      // },
      {
        type: "item",
        text: "我为初审人",
        path: "/task/monitor/first_reviewer",
        icon: "iconfont el-icon-my-due"
      },
      {
        type: "item",
        text: "我为复审人",
        path: "/task/monitor/final_reviewer",
        icon: "iconfont el-icon-my-patent-applied"
      },
      {
        type: "item",
        text: "我为对外代理人",
        path: "/task/monitor/representative",
        icon: "iconfont el-icon-my-contact"
      },
      {
        type: "item",
        text: "我为指导老师",
        path: "/task/monitor/mentor",
        icon: "iconfont el-icon-my-mentor"
      },
      {
        type: "item",
        text: "我为部门主管",
        path: "/task/monitor/supervisor",
        icon: "iconfont el-icon-my-supervisor"
      }
    ]
  },
  {
    type: "submenu",
    text: "已完成",
    path: "/task/finished",
    icon: "iconfont el-icon-my-task-finish",
    children: [
      {
        type: "item",
        text: "我的已完成",
        path: "/task/finished/my",
        icon: "iconfont el-icon-my-people"
      },
      {
        type: "item",
        text: "团队已完成",
        path: "/task/finished/team",
        icon: "iconfont el-icon-my-team"
      }
    ]
  },
  {
    type: "item",
    text: "所有待办",
    path: "/task/all",
    icon: "iconfont el-icon-my-all"
  }
];

const patentMenu = [
  {
    type: "item",
    text: "专利管理",
    path: "/patent/list",
    icon: "iconfont el-icon-my-patent"
  },
  {
    type: "item",
    text: "立案管理",
    path: "/patent/draftbox",
    icon: "iconfont el-icon-my-new"
  },
  {
    type: "item",
    text: "通知书管理",
    path: "/patent/notice",
    icon: "iconfont el-icon-my-notice"
  }
];
const trademarkMenu = [
  {
    type: "item",
    text: "商标管理",
    path: "/trademark/list",
    icon: "iconfont el-icon-my-trademark"
  },
  {
    type: "item",
    text: "立案管理",
    path: "/trademark/draftbox",
    icon: "iconfont el-icon-my-trademark"
  },
  {
    type: "item",
    text: "通知书管理",
    path: "/trademark/notice",
    icon: "iconfont el-icon-my-trademark"
  }
];

const copyrightMenu = [
  {
    type: "item",
    text: "版权管理",
    path: "/copyright/list",
    icon: "iconfont el-icon-my-copyright"
  },
  {
    type: "item",
    text: "版权立案",
    path: "/copyright/draftbox",
    icon: "iconfont el-icon-my-copyright"
  },
  {
    type: "item",
    text: "通知书管理",
    path: "/copyright/notice",
    icon: "iconfont el-icon-my-copyright"
  }
];

const projectMenu = [
  {
    type: "item",
    text: "项目管理",
    path: "/project/list",
    icon: "el-icon-my-report"
  },
  {
    type: "item",
    text: "项目立案",
    path: "/project/draftbox",
    icon: "iconfont el-icon-my-trademark"
  }
];

const crmMenu = [
  {
    type: "item",
    text: "客户管理",
    path: "/crm/customers",
    icon: "iconfont el-icon-my-customer"
  },
  {
    type: "item",
    text: "订单管理",
    path: "/crm/orders",
    icon: "iconfont el-icon-my-order"
  },
  {
    type: "item",
    text: "合同管理",
    path: "/crm/contracts",
    icon: "iconfont el-icon-my-contract"
  },
  // { type: 'item', text: '快递管理', path: '/crm/expresses', icon: 'iconfont el-icon-my-express'},
  {
    type: "submenu",
    text: "客户数据",
    path: "/crm/data",
    icon: "iconfont el-icon-my-data",
    children: [
      {
        type: "item",
        text: "申请人管理",
        path: "/crm/data/applicants",
        icon: "iconfont el-icon-my-people"
      },
      {
        type: "item",
        text: "发明人管理",
        path: "/crm/data/inventors",
        icon: "iconfont el-icon-my-bulb"
      },
      {
        type: "item",
        text: "联系人管理",
        path: "/crm/data/contacts",
        icon: "iconfont el-icon-my-contact"
      },
      {
        type: "item",
        text: "客户备注",
        path: "/crm/data/remarks",
        icon: "iconfont el-icon-my-remark"
      },
      {
        type: "item",
        text: "开票信息",
        path: "/crm/data/invoice_targets",
        icon: "iconfont el-icon-my-voucher"
      },
      {
        type: "item",
        text: "报价管理",
        path: "/crm/data/quotations",
        icon: "iconfont el-icon-my-quotation"
      }
    ]
  },

  // { type: 'submenu', text: '通知发文', path: '/crm/notice', icon: 'iconfont el-icon-my-email', children:[
  // 	{ type: 'item', text: '官文', path: '/crm/notice/notices', icon: 'iconfont el-icon-my-notice'},
  // 	{ type: 'item', text: '报表', path: '/crm/notice/reports', icon: 'iconfont el-icon-my-report'},
  // 	{ type: 'item', text: '年费', path: '/crm/notice/renewals', icon: 'iconfont el-icon-my-renewal-fee'},
  // 	{ type: 'item', text: '快递', path: '/crm/notice/expresses', icon: 'iconfont el-icon-my-express'},
  // ] },
  {
    type: "submenu",
    text: "供应商管理",
    path: "/crm/suppliers",
    icon: "iconfont el-icon-my-supplier",
    children: [
      {
        type: "item",
        text: "供应商管理",
        path: "/crm/suppliers/lists",
        icon: "iconfont el-icon-my-supplier"
      }
      // {
      //   type: "item",
      //   text: "报价管理",
      //   path: "/crm/suppliers/quotations",
      //   icon: "iconfont el-icon-my-quotation"
      // }
    ]
  }
];

const financeMenu = [
  {
    type: "submenu",
    text: "应收管理",
    path: "/finance/revenue",
    icon: "iconfont el-icon-my-invoice",
    children: [
      {
        type: "item",
        text: "所有应收",
        path: "/finance/revenue/all",
        icon: "iconfont el-icon-my-fee"
      },
      {
        type: "item",
        text: "待请费用",
        path: "/finance/revenue/ready_to_request",
        icon: "iconfont el-icon-my-payment-request"
      },
      {
        type: "item",
        text: "请款管理",
        path: "/finance/revenue/payment_requests",
        icon: "iconfont el-icon-my-order"
      },
      {
        type: "item",
        text: "回款管理",
        path: "/finance/revenue/payments_recevied",
        icon: "iconfont el-icon-my-received-payment"
      }
    ]
  },
  {
    type: "submenu",
    text: "应付管理",
    path: "/finance/outgo",
    icon: "iconfont el-icon-my-supplier",
    children: [
      {
        type: "item",
        text: "所有应付",
        path: "/finance/outgo/all",
        icon: "iconfont el-icon-my-fee"
      },
      {
        type: "item",
        text: "待付费用",
        path: "/finance/outgo/ready_to_pay",
        icon: "iconfont el-icon-my-payment"
      },
      {
        type: "item",
        text: "付款管理",
        path: "/finance/outgo/payments",
        icon: "iconfont el-icon-my-order"
      }
    ]
  },
  {
    type: "submenu",
    text: "年费管理",
    path: "/finance/renewal_fees",
    icon: "iconfont el-icon-my-renewal-fee",
    children: [
      {
        type: "item",
        text: "年费监控",
        path: "/finance/renewal_fees/lists",
        icon: "iconfont el-icon-my-monitor"
      },
      {
        type: "item",
        text: "年费评估单",
        path: "/finance/renewal_fees/confirmation_sheets",
        icon: "iconfont el-icon-my-renewal-estimate"
      }
    ]
  },
  {
    type: "submenu",
    text: "发票管理",
    path: "/finance/vouchers",
    icon: "iconfont el-icon-my-voucher",
    children: [
      {
        type: "item",
        text: "己方开具",
        path: "/finance/vouchers/lists",
        icon: "iconfont el-icon-my-people"
      },
      {
        type: "item",
        text: "对方开具",
        path: "/finance/vouchers/received",
        icon: "iconfont el-icon-my-supplier"
      }
    ]
  },
  {
    type: "submenu",
    text: "点数管理",
    path: "/finance/points",
    icon: "iconfont el-icon-my-award",
    children: [
      {
        type: "item",
        text: "点数清单",
        path: "/finance/points/lists",
        icon: "iconfont el-icon-my-zhangdan"
      },
      {
        type: "item",
        text: "点数月报",
        path: "/finance/points/settled",
        icon: "iconfont el-icon-my-statistics"
      }
    ]
  }
];

const reportMenu = [
  {
    type: "item",
    text: "点数报表",
    path: "/report/task",
    icon: "el-icon-my-report"
  },
  {
    type: "item",
    text: "费用报表",
    path: "/report/finance",
    icon: "el-icon-my-report"
  }
];

const exchangeMenu = [
  {
    type: "submenu",
    text: "客户端同步",
    path: "/exchange/client",
    icon: "iconfont el-icon-my-sync",
    children: [
      {
        type: "item",
        text: "通知书",
        path: "/exchange/client/notices",
        icon: "iconfont el-icon-my-notice"
      },
      {
        type: "item",
        text: "递交包",
        path: "/exchange/client/archives",
        icon: "iconfont el-icon-my-archive"
      }
    ]
  },
  {
    type: "submenu",
    text: "文档交互",
    path: "/exchange/document",
    icon: "iconfont el-icon-my-notice",
    children: [
      {
        type: "item",
        text: "官文通知",
        path: "/exchange/document/oa",
        icon: "iconfont el-icon-my-notice"
      },
      {
        type: "item",
        text: "费用单据",
        path: "/exchange/document/voucher",
        icon: "iconfont el-icon-my-voucher"
      },
      {
        type: "item",
        text: "一般文件",
        path: "/exchange/document/other",
        icon: "iconfont el-icon-my-file"
      },
      {
        type: "item",
        text: "CPC通知书",
        path: "/exchange/document/cpc",
        icon: "iconfont el-icon-my-patent"
      },
      {
        type: "item",
        text: "报表交互",
        path: "/exchange/document/excel",
        icon: "iconfont el-icon-my-excel"
      }
    ]
  },

  {
    type: "item",
    text: "邮件",
    path: "/exchange/mails",
    icon: "el-icon-my-email"
  }
];

const dataInsiderMenu = [
  {
    type: "item",
    text: "摘要",
    path: "/datainsider/summary",
    icon: "el-icon-my-report"
  }
];

const settingMenu = [
  {
    type: "item",
    text: "个人设置",
    path: "/setting/my",
    icon: "iconfont el-icon-my-personal-setting"
  },
  {
    type: "item",
    text: "用户管理",
    path: "/setting/users",
    icon: "iconfont el-icon-my-people"
  },

  // { type: 'item', text: '组织架构', path: '/setting/branch', icon: 'iconfont el-icon-my-department' },
  {
    type: "item",
    text: "技术分类管理",
    path: "/setting/classifications",
    icon: "iconfont el-icon-my-org"
  },
  {
    type: "item",
    text: "产品分类管理",
    path: "/setting/products",
    icon: "iconfont el-icon-my-product-category"
  },
  // { type: 'item', text: '报价管理', path: '/setting/offer', icon: 'iconfont el-icon-my-organization' },
  {
    text: "字段权限管理",
    path: "/setting/field",
    icon: "iconfont el-icon-my-authority",
    type: "item"
  },
  {
    type: "item",
    text: "邮件模板管理",
    path: "/setting/mail_templates",
    icon: "iconfont el-icon-my-template"
  },
  {
    type: "submenu",
    text: "流程自定义",
    path: "/setting/flow",
    icon: "iconfont el-icon-my-flow",
    children: [
      {
        type: "item",
        text: "管制事项",
        path: "/setting/flow/definitions",
        icon: "iconfont el-icon-my-task-def"
      },
      {
        type: "item",
        text: "流程管理",
        path: "/setting/flow/flows",
        icon: "iconfont el-icon-my-flow-def"
      },
      {
        type: "item",
        text: "流程节点",
        path: "/setting/flow/actions",
        icon: "iconfont el-icon-my-node"
      },
      {
        type: "item",
        text: "表单编辑",
        path: "/setting/flow/forms",
        icon: "iconfont el-icon-my-file"
      },
      {
        type: "item",
        text: "字段编辑",
        path: "/setting/flow/fields",
        icon: "iconfont el-icon-my-category"
      }
    ]
  },
  {
    type: "submenu",
    text: "基础数据",
    path: "/setting/data",
    icon: "iconfont el-icon-my-data",
    children: [
      {
        type: "item",
        text: "收款账户",
        path: "/setting/data/payment_accounts",
        icon: "iconfont el-icon-my-account"
      },
      {
        type: "item",
        text: "费用类型",
        path: "/setting/data/fee_codes",
        icon: "iconfont el-icon-my-fee-type"
      },
      {
        type: "item",
        text: "文件类型",
        path: "/setting/data/file_types",
        icon: "iconfont el-icon-my-category"
      },
      {
        type: "item",
        text: "案件阶段",
        path: "/setting/data/stages",
        icon: "iconfont el-icon-my-status"
      },
      {
        type: "item",
        text: "服务项目",
        path: "/setting/data/services",
        icon: "iconfont el-icon-my-service"
      },
      {
        type: "item",
        text: "案件标签",
        path: "/setting/data/tags",
        icon: "iconfont el-icon-my-tag"
      }
      // {type: 'item', text: '原始记录', path: '/setting/data/entity_changes', icon: 'iconfont el-icon-my-system'},
    ]
  },
  {
    type: "submenu",
    text: "点数设定",
    path: "/setting/bonus",
    icon: "iconfont el-icon-my-award",
    children: [
      {
        type: "item",
        text: "代理人系数",
        path: "/setting/bonus/ratio",
        icon: "iconfont el-icon-my-star"
      },
      {
        type: "item",
        text: "提成规则",
        path: "/setting/bonus/rules",
        icon: "iconfont el-icon-my-quotation"
      }
    ]
  },
  {
    type: "submenu",
    text: "代理机构",
    path: "/setting/agencies",
    icon: "iconfont el-icon-my-organization",
    children: [
      {
        type: "item",
        text: "代理机构",
        path: "/setting/agencies/lists",
        icon: "iconfont el-icon-my-organization"
      },
      {
        type: "item",
        text: "代理人",
        path: "/setting/agencies/agents",
        icon: "iconfont el-icon-my-people"
      }
    ]
  },
  {
    type: "item",
    text: "系统设置",
    path: "/setting/system",
    icon: "iconfont el-icon-my-system"
  }
];

const homeMenu = [
  {
    type: "item",
    text: "首页",
    path: "/home",
    icon: "iconfont el-icon-my-home"
  }
];

menu.source = [
  // {
  //   text: "首页",
  //   key: "home",
  //   path: "/home",
  //   menu: homeMenu
  // },
  {
    text: "工作流",
    key: "task",
    path: "/task",
    icon: "iconfont el-icon-my-task",
    menu: taskMenu
  },
  {
    text: "专利",
    key: "patent",
    path: "/patent",
    icon: "iconfont el-icon-my-patent",
    menu: patentMenu
  },
  // {
  // 	text: '商标',
  // 	key: 'trademark',
  // 	path: '/trademark',
  // 	icon: 'iconfont el-icon-my-patent',
  // 	menu: trademarkMenu
  // },
  // {
  // 	text: '版权',
  // 	key: 'copyright',
  // 	path: '/copyright',
  // 	icon: 'iconfont el-icon-my-copyright',
  // 	menu: copyrightMenu
  // },
  // {
  // 	text: '项目',
  // 	key: 'project',
  // 	path: '/project',
  // 	icon: 'iconfont el-icon-my-copyright',
  // 	menu: projectMenu,
  // },
  {
    text: "CRM",
    key: "crm",
    path: "/crm",
    icon: "iconfont icon-client",
    menu: crmMenu
  },
  {
    text: "费用",
    key: "fees",
    path: "/finance",
    icon: "iconfont el-icon-my-fee",
    menu: financeMenu
  },
  // {
  // 	text: '报表',
  // 	key: 'report',
  // 	path: '/report',
  // 	icon: 'el-icon-my-report',
  // 	menu: reportMenu,
  // },
  {
    text: "交互",
    key: "exchange",
    path: "/exchange",
    icon: "el-icon-my-interact",
    menu: exchangeMenu
  },
  // {
  // 	text: 'Data Insider',
  // 	key: 'datainsider',
  // 	path: '/datainsider',
  // 	icon: 'iconfont el-icon-my-email',
  // 	menu: dataInsiderMenu,
  // },
  {
    text: "设置",
    key: "setting",
    path: "/setting",
    icon: "iconfont el-icon-my-setting",
    menu: settingMenu
  }
  // {
  // 	text: '测试',
  // 	key: 'test',
  // 	path: '/test',
  // 	icon: '',
  // 	menu: testMenu,
  // }
];

menu.map = {
  "/": { text: "主页", icon: "iconfont el-icon-my-home", path: "/" },
  "/task/pending/check": {
    text: "提案审核",
    icon: "iconfont el-icon-my-task-check",
    path: "/task/pending/check"
  },
  "/patent/applied/detail": {
    text: "专利详情",
    icon: "",
    path: "/patent/applied/detail"
  },
  "/patent/list/detail": {
    text: "专利详情",
    icon: "",
    path: "/patent/list/detail"
  },
  "/copyright/list/detail": {
    text: "版权详情",
    icon: "",
    path: "/copyright/list/detail"
  },
  "/proposal/edit": { text: "提案编辑", icon: "", path: "/proposal/edit" },
  "/proposal/detail": { text: "提案详情", icon: "", path: "/proposal/detail" },
  "/trademark/list/detail": {
    text: "商标详情",
    icon: "",
    path: "/trademark/list/detail/babel"
  },
  "/news/mailList/mailAdd": {
    text: "写邮件",
    icon: "el-icon-edit",
    path: "/news/mailList/mailAdd"
  },
  "/news/mailList/mailEdit": {
    text: "编辑邮件",
    icon: "el-icon-edit",
    path: "/news/mailList/mailEdit"
  },
  "/setting/agency/detail": {
    text: "代理机构详情",
    icon: "",
    path: "/setting/agency/detail"
  },
  "/setting/template/edit": {
    text: "编辑模板",
    icon: "el-icon-edit",
    path: "/setting/template/edit"
  },
  "/news/systemMessage/detail": {
    text: "消息详情",
    icon: "",
    path: "/news/systemMessage/detail"
  },

  "/proposal/add": { text: "新建提案", icon: "", path: "/proposal/add" },
  "/patent/add": { text: "新建专利", icon: "", path: "/patent/add" },
  "/trademark/add": { text: "新建商标", icon: "", path: "/trademark/add" },
  "/copyright/add": { text: "新建版权", icon: "", path: "/copyright/add" },

  "/report/task/add": { text: "新建报表", icon: "", path: "/report/task/add" },
  "/report/proposal/add": {
    text: "新建报表",
    icon: "",
    path: "/report/proposal/add"
  },
  "/report/patent/add": {
    text: "新建报表",
    icon: "",
    path: "/report/patent/add"
  },
  "/report/trademark/add": {
    text: "新建报表",
    icon: "",
    path: "/report/trademark/add"
  },
  "/report/copyright/add": {
    text: "新建报表",
    icon: "",
    path: "/report/copyright/add"
  },
  "/report/fee/add": { text: "新建报表", icon: "", path: "/report/fee/add" },
  "/report/invoice/add": {
    text: "新建报表",
    icon: "",
    path: "/report/invoice/add"
  }
};

const tailRecursion = data => {
  for (let x of data) {
    if (!x["path"]) continue;
    const path = x["type"] && x["type"] == "submenu" ? "" : x["path"];
    menu["map"][x["path"]] = { text: x["text"], icon: x["icon"], path };
    if (x.children && x.children.length != 0) {
      tailRecursion(x["children"]);
    }
  }
};

for (let k in menu.source) {
  const item = menu.source[k];
  const text = item["text"] ? item["text"] : "";
  const icon = item["icon"] ? item["icon"] : "";
  const path = item["path"];
  const parent = "/";
  menu["map"][item["path"]] = { text, icon, path, parent };
  if (item["menu"] && item["menu"]["length"] != 0) {
    tailRecursion(item["menu"]);
  }
}

export default menu;
