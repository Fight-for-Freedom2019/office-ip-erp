// 列表表头筛选配置项
const map = new Map([
  // 工作流
  [
    "task",[
    { type: "text", id: "model", name: "模块" },
    { type: "text", id: "serial", name: "案号" },
    { type: "text", id: "customer_serial", name: "客户案号" },
    { type: "text", id: "title", name: "标题" },
    { type: "static_select", id: "project_tags", name: "案件标签", map_type: "tags", url: true, sortable: false },
    { type: "static_select", id: "process_tags", name: "事项标签", map_type: "tags", url: true, sortable: false },
    { type: "static_select", id: "subtype", name: "案件子类型", map_type: "project_subtype" },
    { type: "static_select", id: "project_type", name: "案件类型", map_type: "project_type" },
    { type: "static_select", id: "project_stage", name: "案件状态", map_type: "project_stage", url: true },
    { type: "static_select", id: "process_definition", name: "管制事项", map_type: "process_definition", url: true },
    { type: "static_select", id: "process_stage", name: "当前阶段", map_type: "process_stage", url: true },
    { type: "static_select", id: "process_action", name: "当前节点", map_type: "actions", sortable: false },
    { type: "static_select", id: "organization_unit", name: "部门", map_type: "branch" },
    { type: "remote_select", id: "user", name: "承办人", data_key: "data", url: "/users" },
    { type: "remote_select", id: "agent", name: "代理人", data_key: "data", url: "/users" },
    { type: "remote_select", id: "representative", name: "对外代理人", data_key: "data", url: "/users", sortable: false },
    // {
    //   type: "remote_select",
    //   id: "assistant",
    //   name: "代理人助理",
    //   data_key: "data",
    //   url: "/users"
    // },
    { type: "remote_select", id: "first_reviewer", name: "初核人", data_key: "data", url: "/users" },
    { type: "remote_select", id: "final_reviewer", name: "复核人", data_key: "data", url: "/users" },
    { type: "remote_select", id: "ipr", name: "IPR", data_key: "data", url: "/contacts" },
    { type: "remote_select", id: "customer", name: "客户", data_key: "data", url: "/customers" },
    { type: "remote_select", id: "contact", name: "联系人", data_key: "data", url: "/contacts" },
    { type: "date", id: "entrusting_time", name: "委案日" },
    { type: "date", id: "creation_time", name: "立案日" },
    { type: "date", id: "deadline", name: "节点期限", sortable: false },
    { type: "date", id: "internal_deadline", name: "管控期限" },
    // { type: "date", id: "first_edition_deadline", name: "初稿期限" },
    // { type: "date", id: "filing_deadline", name: "递交期限" },
    { type: "date", id: "legal_deadline", name: "官方绝限" },
    { type: "date", id: "first_edition_time", name: "初稿日" },
    { type: "date", id: "internal_final_edition_time", name: "内部定稿日" },
    { type: "date", id: "customer_edition_time", name: "返稿日" },
    { type: "date", id: "customer_final_edition_time", name: "客户定稿日" },
    { type: "date", id: "filing_time", name: "递交日" },
    // { type: 'date',             id: 'internal_drafting_period',name: '内部撰写时间'},
    // { type: 'date',             id: 'internal_amending_period',name: '内部修改时间'},
    // { type: 'date',             id: 'internal_reviewing_period',name: '内部审核时间'},
    // { type: 'date',             id: 'customer_first_edition_period',name: '返稿时间'},
    // { type: 'date',             id: 'customer_reviewing_period',name: '客户审核时间'},
    // { type: 'date',             id: 'customer_amending_period',name: '客户审核修改时间'},
    { type: "date", id: "application_date", name: "申请日" },
    { type: "text", id: "application_number", name: "申请号" } // { type: 'text',             id: 'internal_reviewing_times',name: '内部审核次数'}, // { type: 'text',             id: 'customer_reviewing_times',name: '客户审核次数'}, // { type: 'text',             id: 'technical_rank',         name: '技术评分'}, // { type: 'text',             id: 'claims_rank',            name: '权利要求评分'}, // { type: 'text',             id: 'spec_rank',              name: '说明书评分'}, // { type: 'text',             id: 'communication_rank',     name: '沟通交流评分'},
    ]
  ],
  // 专利
  [
    "patent",
    [{ type: "text", id: "serial", name: "案号" },
    { type: "text", id: "english_title", name: "英文名称" },
    { type: "text", id: "proposal_title", name: "客户标题" },
    { type: "text", id: "words_count", name: "说明书字数" },
    { type: "text", id: "claims_count", name: "权利要求项数" },
    { type: "text", id: "start_year", name: "首次年费年度" },
    { type: "remote_select", id: "applicants", name: "申请人", url: "/applicants", data_key: "data" },
    { type: "text", id: "application_number", name: "申请号" },
    { type: "date", id: "application_date", name: "申请日" },
    { type: "date", id: "creation_time", name: "立案日" },
    { type: "date", id: "entrusting_time", name: "委案日" },
    { type: "static_select", id: "subtype", name: "案件类型", map_type: "patent_subtype" },
    { type: "static_select", id: "area", name: "申请国家", map_type: "area" },
    { type: "text", id: "title", name: "标题" },
    { type: "text", id: "abstract", name: "摘要" },
    { type: "date", id: "publication_date", name: "公开日" },
    { type: "text", id: "publication_number", name: "公开号" },
    { type: "text", id: "customer_serial", name: "客户案号" },
    { type: "remote_select", id: "inventors", name: "发明人", url: "/inventors", data_key: "data" },
    { type: "remote_select", id: "process_stage", name: "任务阶段", url: "/stages", data_key: "data" },
    { type: "remote_select", id: "customer", name: "客户", url: "/customers", data_key: "data" },
    { type: "static_select", id: "organization_unit", name: "承办部门", map_type: "branch" },
    { type: "static_select", id: "classification", name: "技术分类", map_type: "classification" },
    { type: "static_select", id: "products", name: "产品分类", map_type: "product" },
    { type: "static_select", id: "level", name: "案件等级", map_type: "case_level" },
    { type: "static_select", id: "project_stage", name: "案件状态", map_type: "project_stage", url: true },
    { type: "static_select", id: "ipr", name: "负责IPR", map_type: "ipr_para", url: true },
    { type: "static_select", id: "application_manner", name: "申请方式", map_type: "application_manner"},
    { type: "text", id: "priorities", name: "优先权" },
    { type: "text", id: "references", name: "案件引用" },
    { type: "text", id: "das", name: "DAS码" },
    { type: "text", id: "order", name: "订单号" },
    { type: "remote_select", id: "agent", name: "代理人", url: "/users", data_key: "data" },
    // {
    //   type: "remote_select",
    //   id: "assistant",
    //   name: "代理人助理",
    //   url: "/users",
    //   data_key: "data"
    // },
    { type: "remote_select", id: "contact", name: "联系人", url: "/contacts", data_key: "data" },
    { type: "remote_select", id: "first_reviewer", name: "初核人", url: "/users", data_key: "data" },
    { type: "remote_select", id: "final_reviewer", name: "复核人", url: "/users", data_key: "data" },
    { type: "remote_select", id: "representative", name: "代表人", url: "/users", data_key: "data" },
    { type: "remote_select", id: "consultant", name: "顾问", url: "/users", data_key: "data" },
    { type: "remote_select", id: "sales", name: "销售", url: "/users", data_key: "data" },
    { type: "date", id: "pre_exam_ok_date", name: "初审合格日" },
    { type: "date", id: "sub_exam_start_date", name: "进入实审日" },
    { type: "date", id: "issue_date", name: "公告日" },
    { type: "text", id: "issue_number", name: "公告号" },
    { type: "date", id: "pct_application_date", name: "国际申请日" },
    { type: "date", id: "pct19_expire_date", name: "PCT19条修改期限" },
    { type: "date", id: "pct_national_stage_expire_date", name: "PCT进入国家阶段期限" },
    { type: "date", id: "pct_pre_exam_expire_date", name: "PCT国际初步审查期限" },
    { type: "date", id: "pct_search_date", name: "国际检索日期" },
    { type: "date", id: "priority_expire_date", name: "优先权届满期限" },
    { type: "text", id: "pct_application_number", name: "国际申请号" },
    { type: "date", id: "pct_priority_date", name: "国际优先权日" },
    { type: "date", id: "pct_publication_date", name: "国际公开日" },
    { type: "static_select", id: "pct_publication_language", name: "国际公开语言", map_type: "language" },
    { type: "text", id: "pct_publication_number", name: "国际公开号" },
    { type: "static_select", id: "is_biological", name: "是否与生物相关", map_type: "bool" },
    { type: "static_select", id: "is_division", name: "是否是分案申请", map_type: "bool" },
    { type: "static_select", id: "is_subexam_request", name: "是否提出实质审查请求", map_type: "bool" },
    { type: "static_select", id: "is_genetic", name: "是否依赖于遗传资源", map_type: "bool" },
    { type: "static_select", id: "is_leakage", name: "是否不丧失新颖性公开", map_type: "bool" },
    { type: "static_select", id: "is_pre_publication", name: "是否提前公开", map_type: "bool" },
    { type: "static_select", id: "is_priority", name: "是否要求优先权", map_type: "bool" },
    { type: "static_select", id: "is_amended", name: "是否变更", map_type: "bool" },
    { type: "static_select", id: "is_secure_examination", name: "是否保密审查", map_type: "bool" },
    { type: "static_select", id: "is_sequence", name: "是否有序列表", map_type: "bool" },
    { type: "static_select", id: "is_utility_or_invention", name: "是否同实用新型/发明", map_type: "bool" },
    { type: "static_select", id: "is_continuation", name: "连续案", map_type: "bool" },
    { type: "date", id: "active_supplement_expire_date", name: "主动修改期限" },
    { type: "text", id: "remark", name: "备注" }
    ]
  ],
  // 商标
  ["trademark",[
    { type: "text", id: "serial", name: "案号" },
    { type: "text", id: "title", name: "标题" },
    { type: "static_select", id: "subtype", name: "商标类型", map_type: "trademark_subtype" },
    { type: "static_select", id: "area", name: "申请国家", map_type: "area" },
    { type: "static_select", id: "categories", name: "商标大类", map_type: "categories" },
    { type: "text", id: "application_number", name: "申请号" },
    { type: "date", id: "application_date", name: "申请日" },
    { type: "date", id: "publication_date", name: "公开日" },
    { type: "text", id: "publication_number", name: "公开号" },
    { type: "date", id: "issue_date", name: "公告日" },
    { type: "text", id: "issue_number", name: "公告号" },
    { type: "remote_select", id: "customer", name: "客户", url: "/customers", data_key: "data" },
    { type: "text", id: "customer_serial", name: "客户案号" },
    { type: "static_select", id: "ipr", name: "负责IPR", map_type: "ipr_para", url: true },
    { type: "remote_select", id: "applicants", name: "申请人", url: "/applicants", data_key: "data" },
    { type: "remote_select", id: "contact", name: "联系人", url: "/contacts", data_key: "data" },
    { type: "static_select", id: "project_stage", name: "案件状态", map_type: "project_stage", url: true },
    { type: "static_select", id: "organization_unit", name: "部门", map_type: "branch" },
    { type: "remote_select", id: "sales", name: "销售", url: "/users", data_key: "data" },
    { type: "remote_select", id: "first_reviewer", name: "初审人", url: "/users", data_key: "data" },
    { type: "remote_select", id: "final_reviewer", name: "复审人", url: "/users", data_key: "data" },
    { type: "remote_select", id: "agent", name: "代理人", url: "/users", data_key: "data" },
    { type: "remote_select", id: "consultant", name: "顾问", url: "/users", data_key: "data" },
    { type: "text", id: "order", name: "订单号" },
    { type: "text", id: "order_serial", name: "第三方订单号" },
    { type: "date", id: "entrusting_time", name: "委案日" },
    { type: "text", id: "remark", name: "备注" },
  ]],
  // 版权
  ["copyright", [
    { type: "text", id: "serial", name: "案号"},
    { type: "text", id: "title", name: "标题"},
    { type: "static_select", id: "subtype", name: "版权类型", map_type: "copyright_subtype" },
    { type: "text", id: "application_number", name: "受理号"},
    { type: "date", id: "application_date", name: "受理日" },
    { type: "date", id: "issue_date", name: "下证日" },
    { type: "text", id: "issue_number", name: "证书号" },
    { type: "remote_select", id: "customer", name: "客户", url: "/customers", data_key: "data" },
    { type: "text", id: "customer_serial", name: "客户案号" },
    { type: "remote_select", id: "applicants", name: "申请人", url: "/applicants", data_key: "data" },
    { type: "remote_select", id: "contact", name: "联系人", url: "/contacts", data_key: "data" },
    { type: "static_select", id: "project_stage", name: "案件状态", map_type: "project_stage", url: true },
    { type: "static_select", id: "organization_unit", name: "部门", map_type: "branch" },
    { type: "remote_select", id: "agent", name: "代理人", data_key: "data", url: "/users" },
    { type: "remote_select", id: "sales", name: "销售", url: "/users", data_key: "data" },
    { type: "text", id: "remark", name: "备注" },
  ]],
  ["notices", [{
    type: "text", id: "project.serial", name: "案号"
  }]],
  //点数规则
  ["bonus_rule",
    [{ type: "static_select", id: "project_type", name: "案件类型", map_type: "project_type" },
    { type: "static_select", id: "project_subtype", name: "案件子类型", map_type: "project_subtype" },
    { type: "static_select", id: "process_definition", name: "管制事项", map_type: "process_definition", url: true },
    { type: "static_select", id: "area", name: "国家", map_type: "area" }
    ]
  ],
  /* 申请人 */
  [
    "applicants",
    [{ type: "static_select", id: "province_code", name: "省份", map_type: "province_code" },
    { type: "static_select", id: "city_code", name: "申请人类型", map_type: "city_code" },
    { type: "remote_select", id: "customer", name: "客户", data_key: "data", url: "/customers" },
    { type: "text", id: "name", name: "申请人姓名" },
    { type: "static_select", id: "citizenship", name: "国籍", map_type: "area" },
    { type: "text", id: "identity", name: "证件号码" },
    { type: "text", id: "postcode", name: "邮编" },
    { type: "text", id: "email_address", name: "邮箱" },
    { type: "text", id: "phone_number", name: "电话号码" },
    { type: "static_select", id: "residence", name: "住所所在地", map_type: "area" },
    { type: "text", id: "address", name: "详细地址" },
    { type: "static_select", id: "is_fee_discount", name: "费用备案", map_type: "fee_discount" },
    { type: "text", id: "english_name", name: "英文姓名" },
    { type: "text", id: "english_address", name: "英文地址" },
    { type: "static_select", id: "is_default", name: "是否默认申请人", map_type: "bool" }
    ]
  ],
  /* 发明人 */
  [
    "inventors",
    [{ type: "text", id: "name", name: "姓名" },
    { type: "text", id: "title", name: "尊称", data_key: "data", url: "/customers" },
    { type: "remote_select", id: "customer", name: "所属客户", data_key: "data", url: "/customers" },
    { type: "static_select", id: "citizenship", name: "国籍", map_type: "area" },
    { type: "text", id: "email_address", name: "邮箱" },
    { type: "text", id: "phone_number", name: "电话号码" },
    { type: "text", id: "identity", name: "证件号码" },
    { type: "static_select", id: "is_publish_name", name: "是否公开姓名", map_type: "bool" },
    { type: "text", id: "first_name", name: "英文名" },
    { type: "text", id: "last_name", name: "英文姓" },
    { type: "text", id: "remark", name: "备注" }
    ]
  ],
  /* 联系人 */
  [
    "contacts",
    [{ type: "text", id: "name", name: "姓名" },
    { type: "text", id: "title", name: "尊称" },
    { type: "remote_select", id: "customer", name: "所属客户", data_key: "data", url: "/customers" },
    { type: "static_select", id: "contact_type", name: "类型", map_type: "contacts_type" },
    { type: "text", id: "email_address", name: "邮箱" },
    { type: "text", id: "phone_number", name: "电话号码" },
    { type: "text", id: "remark", name: "备注" },
    { type: "text", id: "address", name: "地址" }
    ]
  ],
  /* 客户备注 */
  [
    "remarks",
    [{ type: "static_select", id: "type", name: "类型", map_type: "remark_type" },
    { type: "remote_select", id: "user", name: "备注人", data_key: "data", url: "/users" },
    { type: "date", id: "creation_time", name: "备注时间" },
    { type: "text", id: "content", name: "备注内容" }
    ]
  ],
  /* 开票信息 */
  [
    "invoice_targets",
    [{ type: "remote_select", id: "customer", name: "客户", data_key: "data", url: "/customers" },
    { type: "static_select", id: "target_type", name: "主体类型", map_type: "target_type" },
    { type: "text", id: "name", name: "单位名称" },
    { type: "text", id: "identity", name: "纳税人识别号" },
    { type: "text", id: "address", name: "注册地址" },
    { type: "text", id: "phone_number", name: "联系电话" },
    { type: "text", id: "bank", name: "开户行" },
    { type: "text", id: "account", name: "银行账户" },
    { type: "text", id: "remark", name: "备注" }
    ]
  ],
  /* 合同管理 */
  [
    "contracts",
    [{ type: "remote_select", id: "customer", name: "客户", data_key: "data", url: "/customers" },
    { type: "remote_select", id: "contact", name: "联系人", data_key: "data", url: "/contacts" },
    { type: "text", id: "serial", name: "合同编号" },
    { type: "static_select", id: "type", name: "合同类型", map_type: "contract_type" },
    { type: "static_select", id: "status", name: "合同状态", map_type: "contract_status" },
    { type: "date", id: "signing_date", name: "签订日期" },
    { type: "date", id: "expire_date", name: "届满日期" },
    { type: "text", id: "remark", name: "备注" }
    ]
  ],
  /* 待请费用 */
  [
    "fees",
    [{ type: "remote_select", id: "user", name: "客户", data_key: "data", url: "/customers" },
    { type: "remote_select", id: "payment_account", name: "回款/付款账户", data_key: "data", url: "/payment_accounts" },
    { type: "text", id: "application_number", name: "申请号" },
    { type: "text", id: "customer_serial", name: "客户案号" },
    { type: "date", id: "application_date", name: "申请日" },
    /*{ type: "remote_select", id: "project.serial", name: "案号", data_key: "projects", url: "/projects"
    },*/
    { type: "static_select", id: "area", name: "申请国家", map_type: "area" },
    { type: "static_select", id: "subtype", name: "案件类型", map_type: "project_subtype" },
    { type: "text", id: "order", name: "订单号" },
    { type: "static_select", id: "fee_code", name: "费用名称", map_type: "fee_code", url: "/feecode" },
    { type: "static_select", id: "fee_type", name: "费用类型", map_type: "fee_type" },
    { type: "static_select", id: "policy", name: "费用策略", map_type: "policy" },
    { type: "static_select", id: "currency", name: "币别", map_type: "currency" },
    { type: "date", id: "deadline", name: "官方绝限" },
    { type: "date", id: "entrusting_time", name: "委案日" },
    { type: "date", id: "invoice.payment_time", name: "实际付款时间" },
    { type: "date", id: "mail_date", name: "通知书发文日" },
    { type: "static_select", id: "is_opposite_fee_payed", name: "客户已付款", map_type: "bool" },
    { type: "static_select", id: "status", name: "费用状态", map_type: "fee_status" },
    { type: "static_select", id: "payment_request_timing", name: "请款时机", map_type: "payment_request_timing" },
    { type: "text", id: "remark", name: "备注" }
    ]
  ],
  [
    "fees_out",
    [{ type: "remote_select", id: "customer", name: "客户", data_key: "data", url: "/customers" },
      { type: "remote_select", id: "payment_account", name: "回款/付款账户", data_key: "data", url: "/payment_accounts" },
      { type: "text", id: "customer_serial", name: "客户案号" },
      { type: "text", id: "application_number", name: "申请号" },
      { type: "date", id: "application_date", name: "申请日" },
      { type: "date", id: "payment_time", name: "付款日" },
      /*{ type: "remote_select", id: "project.serial", name: "案号", data_key: "projects", url: "/projects"
      },*/
      { type: "static_select", id: "area", name: "申请国家", map_type: "area" },
      { type: "static_select", id: "subtype", name: "案件类型", map_type: "project_subtype" },
      { type: "text", id: "order", name: "订单号" },
      { type: "static_select", id: "fee_code", name: "费用名称", map_type: "fee_code", url: "/feecode" },
      { type: "static_select", id: "fee_type", name: "费用类型", map_type: "fee_type" },
      { type: "static_select", id: "policy", name: "费用策略", map_type: "policy" },
      { type: "static_select", id: "currency", name: "币别", map_type: "currency" },
      { type: "date", id: "deadline", name: "官方绝限" },
      { type: "date", id: "entrusting_time", name: "委案日" },
      { type: "date", id: "invoice.payment_time", name: "实际付款时间" },
      { type: "date", id: "mail_date", name: "通知书发文日" },
      { type: "static_select", id: "is_opposite_fee_payed", name: "客户已付款", map_type: "bool" },
      { type: "static_select", id: "status", name: "费用状态", map_type: "fee_status" },
      { type: "static_select", id: "payment_request_timing", name: "请款时机", map_type: "payment_request_timing" },
      { type: "text", id: "remark", name: "备注" }
    ]
  ],
  /* 年费监控 */
  [
    "renewal_fees",
    [{ type: "remote_select", id: "customer", name: "客户", data_key: "data", url: "/customers?listOnly=1" },
    { type: "date", id: "application_date", name: "申请日" },
    { type: "static_select", id: "area", name: "申请国家", map_type: "area" },
    { type: "static_select", id: "fee_code", name: "费用类型", map_type: "fee_code", url: "/feecode" },
    { type: "static_select", id: "policy", name: "费用策略", map_type: "policy" },
    { type: "date", id: "deadline", name: "官方绝限" },
    { type: "static_select", id: "status", name: "费用状态", map_type: "renewal_fee_status" },
    { type: "static_select", id: "month", name: "申请月份", map_type: "month" },
    { type: "static_select", id: "expire_days", name: "到期天数", map_type: "expire_days" },
    { type: "static_select", id: "project_type", name: "案件类型", map_type: "project_type" }
    ]
  ],
  /* 请款管理 */
  [
    "invoices",
    [{ type: "remote_select", id: "serial", name: "请款单号", data_key: "invoices", url: "/invoices?listOnly=1&listRows=100" },
    { type: "remote_select", id: "creator_user", name: "创建人", data_key: "data" },
    { type: "remote_select", id: "user", name: "请款对象", data_key: "data", url: "/customers" },
    { type: "remote_select", id: "payment_account", name: "回款/付款账户", data_key: "data", url: "/payment_accounts" },
    { type: "text", id: "amount_currency", name: "金额" },
    { type: "text", id: "rmb_amount_currency", name: "人民币" },
    { type: "text", id: "received_amount_currency", name: "实付金额" },
    { type: "date", id: "creation_time", name: "创建时间" },
    { type: "text", id: "amount", name: "金额" },
    { type: "static_select", id: "currency", name: "币别", map_type: "currency" },
    { type: "text", id: "rmb_amount", name: "人民币" },
    { type: "date", id: "request_time", name: "请款时间" },
    { type: "date", id: "deadline", name: "回款期限" },
    { type: "date", id: "payment_time", name: "回款时间" },
    { type: "text", id: "received_amount", name: "回款金额" },
    { type: "remote_select", id: "creator_user_name", name: "回款确认用户", data_key: "data" },
    { type: "date", id: "confirmation_time", name: "回款确认时间" },
    { type: "static_select", id: "status", name: "请款单状态", map_type: "invoice_status" },
    { type: "static_select", id: "is_voucher_uploaded", name: "票据已上传", map_type: "bool" },
    { type: "text", id: "express", name: "快递单号" }
    ]
  ],
  /* 回款管理 */
  [
    "received_payments",
    [{ type: "remote_select", id: "user", name: "客户", data_key: "data", url: "/customers" },
    { type: "remote_select", id: "invoice", name: "请款单号", data_key: "data", url: "/invoices" },
    { type: "remote_select", id: "payment_account", name: "回款账户", data_key: "data", url: "/payment_accounts" },
    { type: "date", id: "received_date", name: "回款时间" },
    { type: "text", id: "amount", name: "回款金额" },
    { type: "static_select", id: "currency", name: "币别", map_type: "currency" },
    { type: "text", id: "remark", name: "备注" }
    ]
  ],
  /* 发票管理 */
  [
    "invoice_request",
    [{ type: "remote_select", id: "customer", name: "客户", data_key: "data", url: "/customers" },
    // { type: "remote_select", id: "invoice", name: "账单编号", data_key: "data", url: "/invoices" },
    { type: "remote_select", id: "invoice_target", name: "抬头", data_key: "data", url: "/invoice_targets" },
    // { type: "static_select", id: "status", name: "申请国家", map_type: "area" },
    { type: "static_select", id: "voucher_type", name: "发票类型", map_type: "voucher_type" },
    { type: "date", id: "date", name: "开票日期" },
    { type: "text", id: "remark", name: "备注" },
    { type: "text", id: "amount", name: "金额" }
    ]
  ],
  /* 交互>客户端>通知书 */
  [
    "cpc_notice",
    [
      { type: 'remote_select', id: 'project', name: '匹配案件', data_key: 'data', url: '/projects?project_type=专利&listOnly=1' },
      { type: "static_select", id: "cpc_file_type", name: "通知书名称", map_type: "file_type_oa", url: true },
      { type: "remote_select", id: "customer", name: "客户", data_key: "data", url: "/customers?listOnly=1" },
      { type: "date", id: "creation_time", name: "上传时间" },
      { type: "date", id: "cpc_deadline", name: "官方绝限" },
      { type: "date", id: "cpc_mail_date", name: "发文日" },
      { type: "static_select", id: "is_imported", name: "是否导入", map_type: "cpc_notice_imported" },
    ]
  ],
  /* 交互>客户端>案卷包 */
  [
    "cpc_archive",
    [ // { type: 'remote_select',    id: 'project',              name: '匹配案件',       data_key: 'data',          url: '/projects?project_type=专利&listOnly=1'}, {   type: "date",   id: "filed_time",   name: "送件日" }, {   type: "date",   id: "legal_deadline",   name: "官方绝限" }, {   type: "date",   id: "filing_deadline",   name: "递交期限" }, {   type: "static_select",   id: "filing_status",   name: "送件状态",   map_type: "cpc_archive_status" }, {   type: "static_select",   id: "process_definition",   name: "管制事项",   map_type: "process_definition",   url: true }
    ]
  ],
  [
    "orders",
    [{ type: "date", id: "delivery_date", name: "交付期限" },
    { type: "remote_select", id: "customer", name: "客户", data_key: "data", url: "/customers?listOnly=1" },
    { type: "remote_select", id: "contact", name: "联系人", data_key: "data", url: "/contacts" },
    { type: "remote_select", id: "sales", name: "销售", data_key: "data", url: "/users?listOnly=1" },
    { type: "static_select", id: "status", name: "状态", map_type: "order_status" }
    ]
  ],
  ["user_manage",
    [{ type: "static_select", id: "roles", name: "用户组", map_type: "group" },
    { type: "static_select", id: "organization_units", name: "部门", map_type: "branch" },
    { type: "static_select", id: "is_active", name: "用户状态", map_type: "status" }
    ]
  ],
  [
    "quotations",
    [{ type: "remote_select", id: "customer", name: "客户", map_type: "customers", url: true },
    { type: "static_select", id: "service", name: "服务项目", map_type: "services", url: true }
    ]
  ],
  [
    "patent_notices",
    [{ type: "remote_select", id: "customer", name: "客户", data_key: "data", url: "/customers" },
    { type: "static_select", id: "is_sent", name: "是否发送", map_type: "status" },
    { type: "static_select", id: "file_type", name: "通知书名称", map_type: "file_type_oa", url: true },
    { type: "date", id: "mail_date", name: "发文日" },
    { type: "date", id: "creation_time", name: "上传日" }
    ]
  ],
  [
    "points",
    [{
      type: "static_select",
      id: "project_type",
      name: "案件类型",
      map_type: "project_type"
    },
    {
      type: "remote_select",
      id: "customer",
      name: "客户",
      data_key: "data",
      url: "/customers?listOnly=1"
    },
    {
      type: "static_select",
      id: "subtype",
      name: "案件子类型",
      map_type: "subtype"
    },
    {
      type: "static_select",
      id: "process",
      name: "管制事项",
      map_type: "process_definition",
      url: true
    },
    {
      type: "static_select",
      id: "area",
      name: "国家/地区",
      map_type: "area"
    },
    {
      type: "static_select",
      id: "bonus_type",
      name: "点数类型",
      map_type: "bonus_type"
    },
    {
      type: "date",
      id: "application_date",
      name: "申请日"
    },
    {
      type: "static_select",
      id: "status",
      name: "状态",
      map_type: "bonus_status"
    },
    {
      type: "remote_select",
      id: "user",
      name: "用户",
      data_key: "data",
      url: "/users"
    }
    ]
  ],
  [
    "bonus_report",
    [{ type: "remote_select", id: "user", name: "用户", data_key: "data", url: "/users" },
    { type: "text", id: "month", name: "月份" }
    ]
  ]
]);
export {
  map
};
