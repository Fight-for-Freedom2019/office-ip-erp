// 高级筛选配置项
const map = new Map([
  [
    "task",
    [
      { components: "static_select", id: "model", name: "模块", type: "process_model", used: true },
      { components: "input", id: "serial", name: "案号" },
      { components: "input", id: "customer_serial", name: "客户案号" },
      { components: "input", id: "title", name: "标题" },
      {
        components: "static_select",
        id: "project_type",
        name: "案件类型",
        type: "project_type",
        used: true
      },
      {
        components: "static_select",
        id: "subtype",
        name: "案件子类型",
        type: "subtype",
        used: true
      },
      {
        components: "static_select",
        id: "project_state",
        name: "案件状态",
        type: "project_stage"
      },
      {
        components: "static_select",
        id: "process_definition",
        name: "管制事项",
        type: "process_definition",
        used: true
      },
      {
        components: "static_select",
        id: "process_action",
        name: "当前节点",
        type: "actions",
        used: true
      },
      {
        components: "static_select",
        id: "process_stage",
        name: "当前阶段",
        type: "process_stage"
      },
      { components: "remote_select", id: "user", name: "承办人", type: "user" },
      {
        components: "remote_select",
        id: "agent",
        name: "代理人",
        type: "user",
        used: true
      },
      {
        components: "remote_select",
        id: "first_reviewer",
        name: "初核人",
        type: "user"
      },
      {
        components: "remote_select",
        id: "final_reviewer",
        name: "复核人",
        type: "user"
      },
      {
        components: "remote_select",
        id: "representative",
        name: "对外代理人",
        type: "user"
      },
      {
        components: "static_select",
        id: "organization_unit",
        name: "所属部门",
        type: "branch",
        used: true
      },
      {
        components: "remote_select",
        id: "project_tags",
        name: "案件标签",
        type: "tags"
      },
      {
        components: "remote_select",
        id: "process_tags",
        name: "事项标签",
        type: "tags"
      },
      { components: "input", id: "application_number", name: "申请号" },
      { components: "date", id: "entrusting_time", name: "委案日" },
      { components: "date", id: "application_date", name: "申请日" },
      {
        components: "remote_select",
        id: "customer",
        name: "客户",
        type: "customer"
      },
      { components: "static_select", id: "ipr", name: "IPR", type: "ipr_para" },
      {
        components: "remote_select",
        id: "contact",
        name: "联系人",
        type: "user"
      },
      { components: "date", id: "deadline", name: "节点期限" },
      { components: "date", id: "internal_deadline", name: "管控期限" },
      { components: "date", id: "legal_deadline", name: "官方绝限" },
      { components: "date", id: "first_edition_time", name: "初稿日" },
      {
        components: "date",
        id: "internal_final_edition_time",
        name: "内部定稿日"
      },
      { components: "date", id: "customer_edition_time", name: "返稿日" },
      {
        components: "date",
        id: "customer_final_edition_time",
        name: "客户定稿日"
      },
      { components: "date", id: "filing_time", name: "递交日" },
      { components: "input", id: "internal_drafting_period", name: "内撰时长" },
      { components: "input", id: "internal_amending_period", name: "内改时长" },
      {
        components: "input",
        id: "internal_reviewing_period",
        name: "内审时长"
      },
      {
        components: "input",
        id: "customer_first_edition_period",
        name: "返稿时长"
      },
      {
        components: "input",
        id: "customer_reviewing_period",
        name: "客审时长"
      },
      { components: "input", id: "customer_amending_period", name: "客改时长" },
      { components: "input", id: "internal_reviewing_times", name: "内审次数" },
      { components: "input", id: "customer_reviewing_times", name: "客审次数" },
      { components: "input", id: "technical_rank", name: "技术评分" },
      { components: "input", id: "claims_rank", name: "权要评分" },
      { components: "input", id: "spec_rank", name: "说明书评分" },
      { components: "input", id: "communication_rank", name: "沟通评分" },
      { components: "input", id: "remark", name: "备注" }
    ]
  ],
  [
    "proposal",
    [
      { components: "input", id: "serial", name: "提案号" },
      {
        components: "remote_select",
        id: "proposer",
        name: "技术联系人",
        type: "member",
        used: true
      },
      {
        components: "static_select",
        id: "ipr",
        name: "IPR",
        type: "ipr",
        used: true
      },
      {
        components: "remote_select",
        id: "inventors",
        name: "发明人",
        type: "inventor"
      },
      {
        components: "static_select",
        id: "branch",
        name: "部门全名",
        type: "branch"
      },
      {
        components: "static_select",
        id: "abbr",
        name: "部门简称",
        type: "abbr",
        used: true
      },
      {
        components: "static_select",
        id: "classification",
        name: "技术分类",
        type: "classification"
      },
      {
        components: "static_select",
        id: "product",
        name: "产品分类",
        type: "product"
      },
      { components: "static_select", id: "tags", name: "标签", type: "tag" },
      {
        components: "static_select",
        id: "patent_level",
        name: "提案等级",
        type: "case_level",
        used: true
      },
      { components: "date", id: "create_time", name: "提案时间" }
    ]
  ],
  [
    "patent",
    [
      { components: "input", id: "serial", name: "案号" },
      // { components: 'input',         id: 'agency_serial',                  name: '事务所案号'},
      { components: "input", id: "english_title", name: "英文名称" },
      { components: "input", id: "references", name: "案件引用" },
      { components: "input", id: "words_count", name: "说明书字数" },
      { components: "input", id: "claims_count", name: "权利要求项数" },
      { components: "input", id: "proposal_title", name: "提案标题" },
      { components: "input", id: "customer_serial", name: "客户案号" },
      { components: "input", id: "start_year", name: "首次年费年度" },
      {
        components: "remote_select",
        id: "applicants",
        name: "申请人",
        type: "applicant"
      },
      { components: "input", id: "application_number", name: "申请号" },
      {
        components: "date",
        id: "application_date",
        name: "申请日",
        used: true
      },
      { components: "date", id: "entrusting_time", name: "委案时间" },
      {
        components: "static_select",
        id: "subtype",
        name: "案件类型",
        type: "patent_type_strainer",
        used: true
      },
      {
        components: "static_select",
        id: "area",
        name: "申请地区",
        type: "area",
        used: true
      },
      // { components: 'static_select', id: 'technical_field',                name: '技术领域', type: 'technical_field'},
      { components: "input", id: "title", name: "标题" },
      // { components: 'date',          id: 'create_time',                    name: '立案时间'},
      { components: "input", id: "abstract", name: "摘要" },
      {
        components: "date",
        id: "publication_date",
        name: "公开日",
        used: true
      },
      { components: "input", id: "publication_number", name: "公开号" },
      // { components: 'input',         id: 'proposal_serial',                name: '提案号'},
      // { components: 'static_select', id: 'progress',                       name: '详细状态', type: 'patents_status'},
      {
        components: "remote_select",
        id: "customer",
        name: "客户",
        type: "customer",
        used: true
      },
      // { components: 'static_select', id: 'flownode',                       name: '详细状态', type: 'flow_node'},
      // { components: 'static_select', id: 'legal_status',                   name: '法律状态', type: 'legal_status'},
      {
        components: "remote_select",
        id: "inventors",
        name: "发明人",
        type: "inventor"
      },
      // { components: 'remote_select', id: 'alias_inventors',                name: '送件发明人', type: 'inventor'},
      // { components: 'static_select', id: 'tags',                           name: '标签', type: 'tag'},
      {
        components: "static_select",
        id: "organization_unit",
        name: "部门",
        type: "branch"
      },
      {
        components: "static_select",
        id: "classification",
        name: "技术分类",
        type: "classification"
      },
      {
        components: "static_select",
        id: "products",
        name: "产品",
        type: "product"
      },
      // { components: 'static_select', id: 'product_relevance',              name: '产品相关', type: 'product_relevance'},
      {
        components: "static_select",
        id: "level",
        name: "案件等级",
        type: "case_level"
      },
      {
        components: "static_select",
        id: "ipr",
        name: "负责IPR",
        type: "ipr_para"
      },
      // { components: 'remote_select', id: 'proposer',                       name: '技术联系人', type: 'member'},
      { components: "input", id: "priorities", name: "优先权" },
      { components: "input", id: "das", name: "DAS码" },
      // { components: 'input',         id: 'tech_rank',                      name: '技术理解评分'},
      // { components: 'input',         id: 'draft_rank',                     name: '撰写质量评分'},
      // { components: 'input',         id: 'service_rank',                   name: '服务态度评分'},
      // { components: 'input',         id: 'negative_flag',                  name: '特别评价'},
      // { components: 'input',         id: 'negative_comment',               name: '评价详情'},
      { components: "input", id: "order", name: "订单号" },
      // { components: 'patent',        id: 'relates',                       name: '相关专利'},
      {
        components: "static_select",
        id: "is_support",
        name: "是否已申请资助",
        type: "bool",
        multiple: false
      }, //是否已申请资助
      {
        components: "static_select",
        id: "project_state",
        name: "案件状态",
        type: "project_stage"
      },
      // { components: 'remote_select', id: 'agency',                         name: '代理机构', type: 'agency', used: true}, //代理机构
      {
        components: "remote_select",
        id: "agent",
        name: "代理人",
        type: "user"
      }, //代理人
      // { components: 'remote_select', id: 'assistant',                          name: '代理人助理', type: 'user'}, //代理人
      {
        components: "remote_select",
        id: "contact",
        name: "联系人",
        type: "user"
      }, //代理人
      {
        components: "remote_select",
        id: "first_reviewer",
        name: "初核人",
        type: "user"
      }, //代理人
      {
        components: "remote_select",
        id: "final_reviewer",
        name: "复核人",
        type: "user"
      }, //代理人
      {
        components: "remote_select",
        id: "representative",
        name: "代表人",
        type: "user"
      }, //代理人
      {
        components: "remote_select",
        id: "consultant",
        name: "顾问",
        type: "user"
      }, //代理人
      { components: "remote_select", id: "sales", name: "销售", type: "user" }, //代理人
      { components: "date", id: "pre_exam_ok_date", name: "初审合格日" },
      { components: "date", id: "sub_exam_start_date", name: "进入实审日" },
      { components: "date", id: "issue_date", name: "公告日", used: true },
      { components: "input", id: "issue_number", name: "公告号" },
      // { components: 'input',         id: 'main_ipc',                         name: '主国际分类号'},
      // { components: 'input',         id: 'ipr_review_times',                 name: 'IPR审核次数'},
      { components: "date", id: "pct_application_date", name: "国际申请日" },
      { components: "date", id: "pct19_expire_date", name: "PCT19条修改期限" },
      {
        components: "date",
        id: "pct_national_stage_expire_date",
        name: "PCT进入国家阶段期限"
      },
      {
        components: "date",
        id: "pct_pre_exam_expire_date",
        name: "PCT国际初步审查期限"
      },
      { components: "date", id: "pct_search_date", name: "国际检索日期" },
      {
        components: "date",
        id: "priority_expire_date",
        name: "优先权届满期限"
      },
      { components: "input", id: "pct_application_number", name: "国际申请号" },
      { components: "date", id: "pct_priority_date", name: "国际优先权日" },
      { components: "date", id: "pct_publication_date", name: "国际公开日" },
      {
        components: "static_select",
        id: "pct_publication_language",
        name: "国际公开语言",
        type: "language"
      },
      { components: "input", id: "pct_publication_number", name: "国际公开号" },
      // { components: 'input',         id: 'board_number',                     name: '复审委内编号'},
      {
        components: "input",
        id: "agent_amending_period",
        name: "代理人修改时间"
      },
      {
        components: "static_select",
        id: "is_biological",
        name: "是否与生物相关",
        type: "bool",
        multiple: false
      },
      {
        components: "static_select",
        id: "is_division",
        name: "是否是分案申请",
        type: "bool",
        multiple: false
      },
      {
        components: "static_select",
        id: "is_exam_request",
        name: "是否提出实质审查请求",
        type: "bool",
        multiple: false
      },
      {
        components: "static_select",
        id: "is_genetic",
        name: "是否依赖于遗传资源",
        type: "bool",
        multiple: false
      },
      {
        components: "static_select",
        id: "is_leakage",
        name: "是否不丧失新颖性公开",
        type: "bool",
        multiple: false
      },
      {
        components: "static_select",
        id: "is_pre_public",
        name: "是否提前公开",
        type: "bool",
        multiple: false
      },
      {
        components: "static_select",
        id: "is_priority",
        name: "是否要求优先权",
        type: "bool",
        multiple: false
      },
      {
        components: "static_select",
        id: "is_secure_check",
        name: "是否保密审查",
        type: "bool",
        multiple: false
      },
      {
        components: "static_select",
        id: "is_sequence",
        name: "是否有序列表",
        type: "bool",
        multiple: false
      },
      {
        components: "static_select",
        id: "is_utility",
        name: "是否同实用新型/发明",
        type: "bool",
        multiple: false
      },
      // { components: 'input',         id: 'words',                         name: '说明书字数'},
      // { components: 'date',          id: 'first_edition_to_inventstring', name: '返发明人初稿时间', date: true }, //返发明人初稿时间
      // { components: 'date',          id: 'inventor_review_time',          name: '发明人完成技术审核时间', date: true },//发明人完成技术审核时间
      // { components: 'date',          id: 'inventor_review_times',         name: '发明人审核次数'},//发明人审核次数
      // { components: '', id: 'inventor_rank',                 name: '发明人技术评分'},//发明人技术评分
      // { components: 'date',          id: 'first_edition_to_ipr_tig',      name: '返IPR初稿时间', date: true },//返IPR初稿时间
      // { components: 'date',          id: 'ipr_final_edition_time',         name: 'IPR定稿时间'}, //IPR定稿时间
      {
        components: "date",
        id: "active_supplement_expire_date",
        name: "主动修改期限"
      },

      // { components: '', id: 'ipr_review_times',              name: 'IPR审核次数'}, //IPR审核次数
      // { components: '', id: 'first_ipr_rank',                name: 'IPR初稿评分'},//IPR初稿评分
      // { components: 'input',         id: 'final_ipr_rank',                 name: 'IPR定稿评分'},//IPR定稿评分
      // { components: 'date',          id: 'agent_drafting_period',         name: '代理撰稿时间', date: true },//代理撰稿时间
      // { components: 'date',          id: 'inventor_review_period',        name: '发明人审核时间', date: true },//发明人审核时间
      // { components: 'date',          id: 'ipr_review_period',             name: 'IPR审核时间', date: true },//IPR审核时间
      // { components: 'date',          id: 'agent_amending_period',         name: '代理人修改时间', date: true },//代理人修改时间
      // { components: 'input',         id: 'group_number',                   name: '群组号码'},//群组号码
      // { components: 'input',         id: 'family_number',                  name: '专利族号码'},//专利族号码
      // { components: 'input',         id: 'extends1',                      name: '自定义字段1'},//自定义字段1
      // { components: 'input',         id: 'extends2',                      name: '自定义字段2'},//自定义字段2
      // { components: 'input',         id: 'extends3',                      name: '自定义字段3'},//自定义字段3
      // { components: 'static_select', id: 'manner',                        name: '申请方式', type: 'manner' },
      // { components: 'static_select', id: 'application_strategy',          name: '申请策略', type: 'strategy'},//申请类型
      // { components: 'static_select', id: 'subexam_timing',                name: '实审时机', type: 'timing'},//实审时间
      // { components: 'input',         id: 'core_concepts',                 name: '关键保护点'},//新申请申请策略
      // { components: 'input',         id: 'decision_reason',               name: '决定原因'},//决定原因
      // { components: 'input',         id: 'innovation_introduction',       name: '创新点简述'},//创新点简述
      // { components: 'static_select', id: 'importance',                    name: '重要性', type: 'patent_importance'},//重要性
      // { components: 'static_select', id: 'avoidability',                  name: '可回避性', type: 'patent_avoidability'},//可回避性
      // { components: 'static_select', id: 'evidence_discovery',            name: '举证难易度', type: 'patent_evidence'},//举证难易度
      // { components: 'static_select', id: 'profitability',                 name: '利润贡献度', type: 'patent_profitability'},//利润贡献度
      // { components: 'static_select', id: 'marketing_value',               name: '推广价值', type: 'patent_marketing'},//推广价值
      // { components: 'static_select', id: 'selling_point',                 name: '卖点相关性', type: 'patent_selling'},//卖点相关性
      // { components: 'input',         id: 'selling_point_technique',       name: '卖点相关技术'},//卖点相关技术
      // { components: 'input',         id: 'competitor_usage',              name: '竞争对手使用'},//竞争对手使用
      // { components: 'input',         id: 'project_name',                   name: '项目名称'},//研发项目名称
      // { components: 'input',         id: 'project_serial',                 name: '项目编号'},//研发项目编号
      { components: "input", id: "remark", name: "备注" }
      // { components: 'remote_select', id: 'awards',                         name: '专利奖', type: 'award'},
      // { components: 'static_select', id: 'abbr',                           name: '部门简称',       type: 'abbr', used: true },
    ]
  ],
  [
    "trademark",
    [
      {
        components: "static_select",
        id: "subtype",
        name: "商标类型",
        type: "trademark_type"
      },
      { components: "static_select", id: "area", name: "地区", type: "area" },
      {
        components: "static_select",
        id: "categories",
        name: "商标类别",
        type: "categories"
      },
      {
        components: "remote_select",
        id: "applicants",
        name: "申请人",
        type: "applicant"
      },
      { components: "date", id: "application_date", name: "申请日" },
      { components: "date", id: "publication_date", name: "初审公告日" },
    ]
  ],
  [
    "copyright",
    [
      {
        components: "static_select",
        id: "type",
        name: "版权类型",
        type: "copyright_type"
      },
      {
        components: "remote_select",
        id: "proposer",
        name: "技术联系人",
        type: "member"
      },
      {
        components: "remote_select",
        id: "applicant",
        name: "申请人",
        type: "applicant"
      },
      {
        components: "remote_select",
        id: "agent",
        name: "代理人",
        type: "agent"
      },
      {
        components: "remote_select",
        id: "agency",
        name: "代理机构",
        type: "agency"
      },
      {
        components: "static_select",
        id: "product",
        name: "产品分类",
        type: "product"
      },
      { components: "static_select", id: "tag", name: "标签", type: "tag" },
      { components: "date", id: "apd", name: "申请日" },
      { components: "date", id: "issue_date", name: "公告日" }
    ]
  ],
  [
    "fee",
    [
      {
        components: "remote_select",
        id: "target",
        name: "费用对象",
        type: "member",
        used: true
      },
      {
        components: "static_select",
        id: "code",
        name: "费用类型",
        type: "fee_code"
      },
      { components: "date", id: "mail_date", name: "通知书发文日" },
      { components: "date", id: "create_time", name: "费用生成日期" },
      { components: "date", id: "due_time", name: "账单期限" },
      { components: "date", id: "deadline", name: "官方绝限" },
      {
        components: "date",
        id: "pay_time",
        name: "发放时间",
        path: "bonus",
        used: true
      },
      {
        components: "date",
        id: "pay_time",
        name: "付款时间",
        path: "oa",
        used: true
      },
      {
        components: "date",
        id: "pay_time",
        name: "到账时间",
        path: "subsidy",
        used: true
      },
      {
        components: "static_select",
        id: "category",
        name: "案件类型",
        type: "project_type"
      },
      {
        components: "static_select",
        id: "patent_type",
        name: "专利类型",
        type: "patent_type"
      },
      { components: "date", id: "apd", name: "申请日" },
      { components: "static_select", id: "area", name: "地区", type: "area" }
    ]
  ],
  [
    "invoice",
    [
      {
        components: "static_select",
        id: "status",
        name: "账单状态",
        type: "invoice_type"
      },
      {
        components: "remote_select",
        id: "target",
        name: "账单对象",
        type: "member",
        used: true
      },
      { components: "date", id: "create_time", name: "账单生成日期" },
      { components: "date", id: "due_time", name: "官方绝限" },
      { components: "date", id: "pay_time", name: "付款时间" }
    ]
  ],
  [
    "patent_notice",
    [
      {
        components: "static_select",
        id: "file_type_id",
        name: "通知书名称",
        type: "file_type_patent_notice",
        used: true
      },
      {
        components: "remote_select",
        id: "uploader",
        name: "上传用户",
        type: "member"
      },
      { components: "date", id: "create_time", name: "上传日" },
      { components: "date", id: "apd", name: "申请日" },
      { components: "date", id: "deadline", name: "官方绝限" },
      { components: "date", id: "mail_date", name: "发文日" }
    ]
  ],
  [
    "certificate",
    [
      { components: "input", id: "certificate_no", name: "证书编号" },
      { components: "input", id: "remark", name: "备注" },
      {
        components: "remote_select",
        id: "applicants",
        name: "申请人",
        type: "applicant",
        used: true
      },
      { components: "input", id: "apn", name: "申请号" },
      { components: "date", id: "apd", name: "申请日", used: true },
      {
        components: "remote_select",
        id: "inventors",
        name: "发明人",
        type: "inventor"
      },
      {
        components: "remote_select",
        id: "agent",
        name: "代理人",
        type: "agent"
      },
      {
        components: "remote_select",
        id: "agency",
        name: "代理机构",
        type: "agency"
      },
      {
        components: "static_select",
        id: "is_district_funding",
        name: "是否已申报资助",
        type: "bool",
        multiple: false
      },
      {
        components: "static_select",
        id: "is_city_funding",
        name: "是否已申报市资助",
        type: "bool",
        multiple: false
      }
    ]
  ],
  /* 申请人 */
  [
    "applicants",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "客户",
        type: "customer",
        used: true
      },
      { components: "input", id: "name", name: "申请人姓名", used: true },
      {
        components: "static_select",
        id: "citizenship",
        name: "国籍",
        type: "area"
      },
      {
        components: "static_select",
        id: "applicant_type",
        name: "申请人类型",
        type: "applicant_type",
        used: true
      },
      { components: "input", id: "identity", name: "证件号码" },
      { components: "input", id: "postcode", name: "邮编" },
      { components: "input", id: "email_address", name: "邮箱" },
      { components: "input", id: "phone_number", name: "电话号码" },
      {
        components: "input",
        id: "residence",
        name: "住所所在地",
        type: "area"
      },
      { components: "input", id: "address", name: "详细地址", type: "area" },
      {
        components: "static_select",
        id: "is_fee_discount",
        name: "费用备案",
        type: "fee_discount"
      },
      { components: "input", id: "english_name", name: "英文姓名" },
      { components: "input", id: "english_address", name: "英文地址" }
    ]
  ],
  /* 发明人 */
  [
    "inventors",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "客户",
        type: "customer",
        used: true
      },
      { components: "input", id: "name", name: "姓名" },
      { components: "input", id: "title", name: "尊称" },
      {
        components: "static_select",
        id: "citizenship",
        name: "国籍",
        type: "area"
      },
      { components: "input", id: "email_address", name: "邮箱" },
      { components: "input", id: "phone_number", name: "电话号码" },
      { components: "input", id: "identity", name: "证件号码" },
      { components: "input", id: "first_name", name: "英文名" },
      { components: "input", id: "last_name", name: "英文姓" },
      { components: "input", id: "remark", name: "备注" }
    ]
  ],
  /* 联系人 */
  [
    "contacts",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "客户",
        type: "customer",
        used: true
      },
      { components: "remote_select", id: "name", name: "姓名" },
      {
        components: "static_select",
        id: "contact_type",
        name: "类型",
        type: "contacts_type",
        used: true
      },
      { components: "input", id: "email_address", name: "邮箱" },
      { components: "input", id: "address", name: "电话号码" },
      { components: "input", id: "phone_number", name: "地址" },
      { components: "input", id: "remark", name: "备注" }
    ]
  ],
  /* 客户备注 */
  [
    "remarks",
    [
      {
        components: "remote_select",
        id: "user",
        name: "备注人",
        type: "user",
        used: true
      },
      {
        components: "static_select",
        id: "type",
        name: "类型",
        type: "remark_type",
        used: true
      },
      { components: "date", id: "creation_time", name: "备注时间" },
      { components: "input", id: "content", name: "备注内容" }
    ]
  ],
  /* 合同管理 */
  [
    "contracts",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "客户",
        type: "customer",
        used: true
      },
      {
        components: "remote_select",
        id: "name",
        name: "联系人",
        type: "contacts",
        used: true
      },
      { components: "input", id: "serial", name: "合同编号" },
      {
        components: "static_select",
        id: "type",
        name: "合同类型",
        type: "contract_type",
        used: true
      },
      { components: "date", id: "signing_date", name: "签订日期" },
      { components: "date", id: "expire_date", name: "届满日期" },
      { components: "input", id: "remark", name: "备注" }
    ]
  ],
  /* 开票信息 */
  [
    "invoice_targets",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "客户",
        type: "customer",
        used: true
      },
      {
        components: "static_select",
        id: "target_type",
        name: "主体类型",
        type: "target_type",
        used: true
      },
      { components: "input", id: "name", name: "单位名称" },
      { components: "input", id: "identity", name: "纳税人识别号" },
      { components: "input", id: "address", name: "注册地址" },
      { components: "input", id: "phone_number", name: "联系电话" },
      { components: "input", id: "bank", name: "开户行" },
      { components: "input", id: "account", name: "银行账户" },
      { components: "input", id: "remark", name: "备注" }
    ]
  ],
  /* 待请费用 */
  [
    "fees",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "客户",
        type: "customer",
        used: true
      },
      { components: "date", id: "deadline", name: "费用期限" },
      {
        components: "static_select",
        id: "status",
        name: "费用状态",
        type: "fee_status",
        used: true
      },
      { components: "date", id: "payment_time", name: "请款时间" },
      { components: "date", id: "entrusting_time", name: "委案日" }
    ]
  ],
  /* 待付费用 */
  [
    "fees_out",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "客户",
        type: "customer",
        used: true
      },
      { components: "date", id: "deadline", name: "费用期限" },
      {
        components: "static_select",
        id: "status",
        name: "费用状态",
        type: "fee_status",
        used: true
      },
      { components: "date", id: "payment_time", name: "请款时间" },
      { components: "date", id: "entrusting_time", name: "委案日" }
    ]
  ],
  /* 请款管理 */
  [
    "invoices",
    [
      {
        components: "remote_select",
        id: "user",
        name: "请款对象",
        type: "user",
        used: true
      },
      { components: "date", id: "request_time", name: "请款时间" },
      { components: "date", id: "deadline", name: "回款期限" },
      { components: "date", id: "payment_time", name: "回款时间" },
      {
        components: "static_select",
        id: "status",
        name: "请款单状态",
        type: "invoice_status"
      }
    ]
  ],
  /* 回款管理 */
  [
    "received_payments",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "客户",
        type: "customer",
        used: true
      }
    ]
  ],
  /* 发票管理 */
  [
    "invoice_request",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "客户/供应商",
        type: "customer",
        used: true
      },
      {
        components: "static_select",
        id: "status",
        name: "状态",
        type: "voucher_status"
      }
    ]
  ],
  /* 交互>客户端>通知书 */
  [
    "cpc_notice",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "案件引用",
        type: "专利",
        used: true
      },
      { components: "date", id: "creation_time", name: "上传时间", used: true },
      { components: "date", id: "cpc_mail_date", name: "发文日", used: true },
      {
        components: "date",
        id: "cpc_legal_deadline",
        name: "官方绝限",
        used: true
      },
      { components: "date", id: "import_date", name: "导入时间" },
      { components: "date", id: "cpc_download_date", name: "下载日" },
      {
        components: "remote_select",
        id: "creator_user",
        name: "上传用户",
        type: "user"
      },
      {
        components: "remote_select",
        id: "import_user",
        name: "导入用户",
        type: "user"
      },
      {
        components: "static_select",
        id: "source",
        name: "来源",
        type: "cpc_notice_source",
        used: true
      }
    ]
  ],
  /* 交互>客户端>案卷包 */
  [
    "cpc_archive",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "案件引用",
        type: "专利",
        used: true
      },
      {
        components: "static_select",
        id: "process_definition",
        name: "管制事项",
        type: "process_definition",
        used: true
      },
      { components: "date", id: "filed_date", name: "送件日", used: true },
      {
        components: "static_select",
        id: "filing_staus",
        name: "送件状态",
        type: "cpc_archive_status",
        used: true
      }
    ]
  ],
  /* 点数 */
  [
    "points",
    [
      {
        components: "static_select",
        id: "project_type",
        name: "案件类型",
        type: "project_type",
        used: true
      },
      {
        components: "static_select",
        id: "subtype",
        name: "案件子类型",
        type: "subtype",
        used: true
      },
      {
        components: "static_select",
        id: "process",
        name: "管制事项",
        type: "process_definition",
        used: true
      },
      {
        components: "static_select",
        id: "area",
        name: "国家/地区",
        type: "area",
        used: true
      },
      {
        components: "static_select",
        id: "bonus_type",
        name: "点数类型",
        type: "bonus_type",
        used: true
      },
      {
        components: "static_select",
        id: "status",
        name: "状态",
        type: "bonus_status",
        used: true
      },
      {
        components: "static_select",
        id: "task",
        name: "流程节点",
        type: "actions",
        used: true
      },
      {
        components: "remote_select",
        id: "user",
        name: "用户",
        type: "user",
        used: true
      },
      {
        components: "remote_select",
        id: "last_modifier_user",
        name: "最后修改用户",
        type: "user"
      },
      { components: "input", id: "serial", name: "案号" },
      { components: "input", id: "title", name: "标题" },
      { components: "input", id: "points", name: "点数" },
      { components: "input", id: "remark", name: "备注" },
      { components: "input", id: "application_number", name: "申请号" },
      { components: "date", id: "application_date", name: "申请日" },
      {
        components: "date",
        id: "last_modification_time",
        name: "最后修改时间"
      },
      {
        components: "remote_select",
        id: "project_tags",
        name: "案件标签",
        type: "tags"
      },
      {
        components: "remote_select",
        id: "process_tags",
        name: "事项标签",
        type: "tags"
      }
    ]
  ],
  /* 点数报表 */
  [
    "bonus_report",
    [
      {
        components: "remote_select",
        id: "user",
        name: "用户",
        type: "user",
        used: true
      },
      {
        components: "text",
        id: "month",
        name: "月份",
        type: "text",
        used: true
      }
    ]
  ],
  /* 通知书管理 */
  [
    "patent_notices",
    [
      {
        components: "remote_select",
        id: "customer",
        name: "所属客户",
        type: "customer",
        used:true,
      },
      {
        components: "static_select",
        id: "file_type",
        name: "通知书名称",
        type: "file_type",
        used:true,
      },
      { components: "input", id: "serial", name: "案号" },
      {
        components: "static_select",
        id: "is_sent",
        name: "是否发送",
        type: "bool",
        multiple: false
      },
      // { components: "input", id: "customer_serial", name: "客户案号" },
      { components: "input", id: "title", name: "案件名称" },
      { components: "input", id: "application_number", name: "申请号" },
      { components: "date", id: "application_date", name: "申请日" },
      { components: "date", id: "mail_date", name: "发文日" },
      { components: "input", id: "mail_serial", name: "发文序列号" },
      { components: "date", id: "legal_deadline", name: "官方绝限" },
      { components: "date", id: "creation_time", name: "上传日" },
      { components: "remote_select", id: "creator_user", type:"customer", name: "上传用户" },

    ]
  ]
]);

const customPathMap = new Map([
  ["task", "/task/custom"],
  ["proposal", "/proposal/custom"],
  ["patent", "/patent/custom"],
  ["trademark", "/trademark/custom"],
  ["copyright", "/copyright/custom"],
  ["fee", "/fee/custom"]
]);

const listPathMap = new Map([
  ["task", "/task/pending"],
  ["proposal", "/proposal/list"],
  ["patent", "/patent/list"],
  ["trademark", "/trademark/list"],
  ["copyright", "/copyright/list"],
  ["fee", "/fee/income"],
  ["patent_notice", "/news/patent_notice"],
  ["certificate", "/patent/certificate"]
]);

export { map, customPathMap, listPathMap };
