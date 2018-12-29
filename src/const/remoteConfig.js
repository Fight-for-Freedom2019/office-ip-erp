/**
  远程remote-select接口参数配置
**/
const map = new Map([
  ["contracts", {
    URL: "/contracts",
    DATA_KEY: "data",
    PLACEHOLDER: "请输入合同关键词"
  }], 
  ["member", {
    URL: "/members",
    DATA_KEY: "members",
    PLACEHOLDER: "请输入用户关键词"
  }], 
  ["applicant", {
      URL: "/applicants",
      DATA_KEY: "data",
      PLACEHOLDER: "请输入申请人关键词"
    }
  ], 
  ["inventor", {
      URL: "/inventors",
      DATA_KEY: "data",
      PLACEHOLDER: "请输入发明人关键词"
    }
  ],
   [ "agent", {
      URL: "/agents",
      DATA_KEY: "members",
      PLACEHOLDER: "请输入代理人关键词"
    }
  ],
   ["ipr", {
      URL: "/iprs",
      DATA_KEY: "members",
      PLACEHOLDER: "请输入IPR关键词"
    }
  ], 
  ["oa", {
      URL: "/projects",
      DATA_KEY: "projects",
      PLACEHOLDER: "请输入OA关键词"
    }
  ], [
    "voucher", {
      URL: "/projects",
      DATA_KEY: "projects",
      PLACEHOLDER: "请输入费用单据关键词"
    }
  ], 
  [ "other", {
      URL: "/projects",
      DATA_KEY: "projects",
      PLACEHOLDER: "请输入一般文件关键词"
    }
  ], 
  [ "cpc", {
      URL: "/projects",
      DATA_KEY: "projects",
      PLACEHOLDER: "请输入CPC关键词"
    }
  ],
   ["project", {
      URL: "/projects",
      DATA_KEY: "projects",
      PLACEHOLDER: "请输入案件关键词"
    }
  ], 
  [ "专利", {
      URL: "/projects",
      DATA_KEY: "projects",
      PLACEHOLDER: "请输入专利关键词",
      PARAMS: {
        project_type: "专利"
      }
    }
  ], 
  ["商标", {
      URL: "/projects",
      DATA_KEY: "projects",
      PLACEHOLDER: "请输入商标关键词",
      PARAMS: {
        project_type: "商标"
      }
    }
  ], 
  ["版权", {
      URL: "/projects",
      DATA_KEY: "projects",
      PLACEHOLDER: "请输入版权关键词",
      PARAMS: {
        project_type: "版权"
      }
    }
  ],
   ["invoices", {
      URL: "/invoices",
      DATA_KEY: "invoices",
      PLACEHOLDER: "请输入账单关键词"
    }
  ], 
  ["invoice_target", {
    URL: '/invoice_targets',
    DATA_KEY: 'data',
    PLACEHOLDER: '请输入开票主体',
  }],  
  ["payment_accounts", {
    URL: '/payment_accounts?listOnly=1',
    DATA_KEY: 'data',
    PLACEHOLDER: '请选择回款账户',
  }],
  [ "bill", {
      URL: "/invoices",
      DATA_KEY: "invoices",
      PLACEHOLDER: "请输入请款单关键词",
      PARAMS: {
        debit: 1
      }
  }],
   [ "pay", {
      URL: "/invoices",
      DATA_KEY: "invoices",
      PLACEHOLDER: "请输入付款单关键词",
      PARAMS: {
        debit: 0
      }
    }], 
  ["process_stage",{
    URL: '/stages?listOnly=1',
    DATA_KEY: 'data',
    PLACEHOLDER: '请输入任务阶段',
  }],    
  ["mail", {
      URL: "/mailAddress",
      DATA_KEY: "data",
      PLACEHOLDER: "请输入邮箱",
      dynamicCreate: true,
      defaultFirstOption: true
    }
  ], 
  ["group_number", {
      URL: "/gnumbers",
      DATA_KEY: "data",
      PLACEHOLDER: "请输入群组号"
    }
  ], 
  ["family_number", {
      URL: "/fnumbers",
      DATA_KEY: "data",
      PLACEHOLDER: "请输入专利族号"
    }
  ], 
  ["award", {
      URL: "/award",
      DATA_KEY: "awards",
      PLACEHOLDER: "请输入奖项名称"
    }
  ], 
  [ "customer", {
      URL: "/customers",
      DATA_KEY: "data",
      PLACEHOLDER: "请选择客户"
    }
  ],
   ["user", {
      URL: "/users",
      DATA_KEY: "data",
      PLACEHOLDER: "请选择人员"
    }
  ], 
  ["contacts", {
      URL: "/contacts",
      DATA_KEY: "data",
      PLACEHOLDER: "请选择联系人"
    }
  ], 
  ["ipr_para", {
      URL: "/contacts",
      DATA_KEY: "data",
      PLACEHOLDER: "请输入IPR关键词",
      PARAMS: {
        cotatct_type: 2
      }
    }
  ], 
  [ "definitions", {
      URL: "/definitions",
      DATA_KEY: "data",
      PLACEHOLDER: "请选择触发的默认管制事项"
    }
  ],
   ["roles", {
      URL: "/roles",
      DATA_KEY: "data",
      PLACEHOLDER: "请选择用户"
    }
  ], 
  [ "mail_roles", {
      URL: "/mail_roles",
      DATA_KEY: "data",
      PLACEHOLDER: "请选择收件人身份"
    }
  ], 
  ["orders", {
      URL: "/orders?listOnly=1",
      DATA_KEY: "data",
      PLACEHOLDER: "请选择订单"
    }
  ], 
  ["patent_family", {
      URL: "/families?listOnly=1",
      DATA_KEY: "data",
      PLACEHOLDER: "请选择专利族"
    }
  ], 
  ["tags", {
      URL: "/tags",
      DATA_KEY: "data",
      PLACEHOLDER: "请选择标签"
    }
  ], 
  ["services", {
      URL: "/services",
      DATA_KEY: "data",
      PLACEHOLDER: "请选择服务类型"
    }
  ],
  ["project_stage",{
    URL: '/project_stages',
    DATA_KEY: 'data',
    PLACEHOLDER: '请选择案件状态',
  }],
]);
export default map;