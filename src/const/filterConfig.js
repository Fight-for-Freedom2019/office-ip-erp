const map = new Map([
    ['task', [
        { components: 'static_select', id: 'category',                       name: '案件类型', type: 'case_type' },
        { components: 'static_select', id: 'type_name',                       name: '专利类型', type: 'patent_type' },
        { components: 'input',         id: 'serial',                        name: '案号'},
        { components: 'input',         id: 'title',                        name: '案件名称'},
        { components: 'input',         id: 'agency_serial',                 name: '事务所案号'},
        { components: 'input',         id: 'proposal_title',                 name: '提案标题'},
        { components: 'static_select', id: 'branch',                         name: '部门', type: 'branch'},
        { components: 'remote_select', id: 'proposer',                       name: '技术联系人', type: 'member'},        
        { components: 'input',         id: 'apn',                           name: '申请号'},
        { components: 'static_select', id: 'taskdef',                  name: '管制事项',    type: 'task_def' , used: true},
        { components: 'static_select', id: 'flownode',                  name: '流程节点',    type: 'flow_node'},
        { components: 'static_select', id: 'ipr',                           name: 'IPR',        type: 'ipr' , used: true},
        { components: 'remote_select', id: 'agency',                        name: '代理机构',    type: 'agency' , used: true},
        { components: 'remote_select', id: 'agent',                         name: '代理人',      type: 'agent' , used: true},
        { components: 'remote_select', id: 'person_in_charge',              name: '承办人',      type: 'member' , used: true},
        { components: 'remote_select', id: 'sender',                        name: '任务来源',    type: 'member' },
        { components: 'date',          id: 'start_time',                    name: '开始时间' },
        { components: 'date',          id: 'due_time',                      name: '内部期限' },
        { components: 'date',          id: 'deadline',                      name: '官方绝限' },
        { components: 'date',          id: 'end_time',                      name: '完成时间' },
        { components: 'date',          id: 'apd',                           name: '申请日' },
        { components: 'date',          id: 'process_start_time',                           name: '管制事项开始' },
        { components: 'date',          id: 'process_inner_deadline',                           name: '管制事项期限' },
        { components: 'date',          id: 'first_edition_time',                           name: '返稿日' },
        { components: 'input',         id: 'duetime_days',                         name: '节点超期天数'},        
        { components: 'input',         id: 'process_duetime_days',                         name: '管制事项超期天数'},        
        { components: 'input',         id: 'remark',                         name: '备注'},        
        // { components: 'date',          id: 'inner_deadline',                name: '管控期限' },
    ]],
    ['proposal', [
        { components: 'input',         id: 'serial',                        name: '提案号' },
        { components: 'remote_select', id: 'proposer',                      name: '技术联系人',         type: 'member'  , used: true},
        { components: 'static_select', id: 'ipr',                           name: 'IPR',           type: 'ipr'  , used: true},
        { components: 'remote_select', id: 'inventors',                     name: '发明人',         type: 'inventor' },
        { components: 'static_select', id: 'branch',                        name: '部门全名',        type: 'branch' },
        { components: 'static_select', id: 'abbr',                          name: '部门简称',       type: 'abbr'  , used: true},
        { components: 'static_select', id: 'classification',                name: '技术分类',       type: 'classification' },
        { components: 'static_select', id: 'product',                       name: '产品分类',       type: 'product' },
        { components: 'static_select', id: 'tags',                          name: '标签',           type: 'tag' },
        { components: 'static_select', id: 'patent_level',                  name: '提案等级',       type: 'case_level'  , used: true},
        { components: 'date',          id: 'create_time',                   name: '提案时间' },
    ]],
    ['patent', [
        { components: 'input',         id: 'serial',                        name: '案号'},
        { components: 'input',         id: 'agency_serial',                  name: '事务所案号'},
        { components: 'input',         id: 'english_title',                  name: '英文名称'},
        { components: 'input',         id: 'proposal_title',                  name: '提案标题'},
        { components: 'input',         id: 'start_year',                    name: '首次年费年度'},
        { components: 'remote_select', id: 'applicants',                    name: '申请人', type: 'applicant',},
        { components: 'input',         id: 'apn',                           name: '申请号'},
        { components: 'date',          id: 'apd',                           name: '申请日', used: true},
        { components: 'date',          id: 'entrusting_time',               name: '委案时间'},
        { components: 'static_select', id: 'type',                          name: '专利类型', type: 'patent_type', used: true},
        { components: 'static_select', id: 'area',                           name: '申请地区', type: 'area'},
        { components: 'static_select', id: 'technical_field',                name: '技术领域', type: 'technical_field'},
        { components: 'input',         id: 'title',                          name: '标题'},
        { components: 'date',          id: 'create_time',                    name: '立案时间'},
        { components: 'input',         id: 'abstract',                       name: '摘要'},
        { components: 'date',          id: 'public_date',                    name: '公开日'},
        { components: 'input',         id: 'public_number',                  name: '公开号'}, 
        { components: 'input',         id: 'proposal_serial',                name: '提案号'},
        { components: 'static_select', id: 'progress',                       name: '详细状态', type: 'patents_status'},
        // { components: 'static_select', id: 'flownode',                       name: '详细状态', type: 'flow_node'},
        { components: 'static_select', id: 'legal_status',                   name: '法律状态', type: 'legal_status'},
        { components: 'remote_select', id: 'inventors',                      name: '发明人', type: 'inventor'},
        { components: 'remote_select', id: 'alias_inventors',                name: '送件发明人', type: 'inventor'},
        { components: 'static_select', id: 'tags',                           name: '标签', type: 'tag'},
        { components: 'static_select', id: 'branch',                         name: '部门', type: 'branch'},
        { components: 'static_select', id: 'classification',                 name: '技术分类', type: 'classification'},
        // { components: 'static_select', id: 'products',                       name: '产品', type: 'product'},
        { components: 'static_select', id: 'product_relevance',              name: '产品相关', type: 'product_relevance'},
        { components: 'static_select', id: 'level',                          name: '案件等级', type: 'case_level'},
        { components: 'static_select', id: 'agency_type',                    name: '案件类型', type: 'agency_type'},
        { components: 'static_select', id: 'ipr',                            name: '负责IPR', type: 'ipr', used: true},
        { components: 'remote_select', id: 'proposer',                       name: '技术联系人', type: 'member'},
        // { components: 'input',         id: 'priorities',                     name: '优先权'},
        { components: 'input',         id: 'das',                            name: 'DAS码'},
        { components: 'input',         id: 'tech_rank',                      name: '技术理解评分'},
        { components: 'input',         id: 'draft_rank',                     name: '撰写质量评分'},
        { components: 'input',         id: 'service_rank',                   name: '服务态度评分'},
        { components: 'input',         id: 'negative_flag',                  name: '特别评价'},
        { components: 'input',         id: 'negative_comment',               name: '评价详情'},
        // { components: 'patent',        id: 'relates',                       name: '相关专利'},
        { components: 'static_select', id: 'is_support',                     name: '是否已申请资助', type: 'bool', multiple: false}, //是否已申请资助
        { components: 'remote_select', id: 'agency',                         name: '代理机构', type: 'agency', used: true}, //代理机构
        { components: 'remote_select', id: 'agent',                          name: '代理人', type: 'agent'}, //代理人
        { components: 'date',          id: 'pre_exam_ok_date',               name: '初审合格日'},
        { components: 'date',          id: 'sub_exam_start_date',            name: '进入实审日'},
        { components: 'date',          id: 'issue_date',                       name: '公告日'},
        { components: 'input',         id: 'issue_number',                     name: '公告号'},
        { components: 'input',         id: 'main_ipc',                         name: '主国际分类号'},
        { components: 'input',         id: 'ipr_review_times',                 name: 'IPR审核次数'},
        { components: 'date',          id: 'pct_apd',                          name: '国际申请日'},
        { components: 'date',          id: 'pct_19_expire_date',               name: 'PCT19条修改期限'},
        { components: 'date',          id: 'pct_national_stage_expire_date',   name: 'PCT进入国家阶段期限'},
        { components: 'date',          id: 'pct_pre_exam_expire_date',         name: 'PCT国际初步审查期限'},
        { components: 'date',          id: 'pct_search_date',                  name: '国际检索日期'},
        { components: 'date',          id: 'priority_expire_date',             name: '优先权届满期限'},
        { components: 'input',         id: 'pct_no',                           name: '国际申请号'},
        { components: 'date',          id: 'pct_priority_date',                name: '国际优先权日'},
        { components: 'date',          id: 'pct_public_date',                  name: '国际公开日'},
        { components: 'static_select', id: 'pct_public_language',              name: '国际公开语言', type: 'language'},
        { components: 'input',         id: 'pct_public_no',                    name: '国际公开号'},
        { components: 'input',         id: 'board_number',                     name: '复审委内编号'},
        { components: 'input',         id: 'agent_amending_period',            name: '代理人修改时间'},
        { components: 'static_select', id: 'is_biological',                  name: '是否与生物相关', type: 'bool', multiple: false},
        { components: 'static_select', id: 'is_division',                    name: '是否是分案申请', type: 'bool', multiple: false},
        { components: 'static_select', id: 'is_exam_request',                name: '是否提出实质审查请求', type: 'bool', multiple: false},
        { components: 'static_select', id: 'is_genetic',                     name: '是否依赖于遗传资源', type: 'bool', multiple: false},
        { components: 'static_select', id: 'is_leakage',                     name: '是否不丧失新颖性公开', type: 'bool', multiple: false},
        { components: 'static_select', id: 'is_pre_public',                  name: '是否提前公开', type: 'bool', multiple: false},
        { components: 'static_select', id: 'is_priority',                    name: '是否要求优先权', type: 'bool', multiple: false},
        { components: 'static_select', id: 'is_secure_check',                name: '是否保密审查', type: 'bool', multiple: false},
        { components: 'static_select', id: 'is_sequence',                    name: '是否有序列表', type: 'bool', multiple: false},
        { components: 'static_select', id: 'is_utility',                     name: '是否同实用新型/发明', type: 'bool', multiple: false},
        // { components: 'input',         id: 'words',                         name: '说明书字数'},
        // { components: 'date',          id: 'first_edition_to_inventstring', name: '返发明人初稿时间', date: true }, //返发明人初稿时间
        // { components: 'date',          id: 'inventor_review_time',          name: '发明人完成技术审核时间', date: true },//发明人完成技术审核时间
        // { components: 'date',          id: 'inventor_review_times',         name: '发明人审核次数'},//发明人审核次数
        // { components: '', id: 'inventor_rank',                 name: '发明人技术评分'},//发明人技术评分
        // { components: 'date',          id: 'first_edition_to_ipr_tig',      name: '返IPR初稿时间', date: true },//返IPR初稿时间
        // { components: 'date',          id: 'ipr_final_edition_time',         name: 'IPR定稿时间'}, //IPR定稿时间
        { components: 'date',          id: 'active_supplement_expire_date',  name: '主动修改期限'}, 

        // { components: '', id: 'ipr_review_times',              name: 'IPR审核次数'}, //IPR审核次数
        // { components: '', id: 'first_ipr_rank',                name: 'IPR初稿评分'},//IPR初稿评分
        // { components: 'input',         id: 'final_ipr_rank',                 name: 'IPR定稿评分'},//IPR定稿评分
        // { components: 'date',          id: 'agent_drafting_period',         name: '代理撰稿时间', date: true },//代理撰稿时间
        // { components: 'date',          id: 'inventor_review_period',        name: '发明人审核时间', date: true },//发明人审核时间
        // { components: 'date',          id: 'ipr_review_period',             name: 'IPR审核时间', date: true },//IPR审核时间
        // { components: 'date',          id: 'agent_amending_period',         name: '代理人修改时间', date: true },//代理人修改时间
        { components: 'input',         id: 'group_number',                   name: '群组号码'},//群组号码
        { components: 'input',         id: 'family_number',                  name: '专利族号码'},//专利族号码
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
        { components: 'input',         id: 'project_name',                   name: '项目名称'},//研发项目名称
        { components: 'input',         id: 'project_serial',                 name: '项目编号'},//研发项目编号
        { components: 'input',         id: 'remark',                         name: '备注'},
        { components: 'remote_select', id: 'awards',                         name: '专利奖', type: 'award'},
        { components: 'static_select', id: 'abbr',                           name: '部门简称',       type: 'abbr', used: true },
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
        { components: 'remote_select', id: 'proposer', name: '技术联系人', type: 'member'},
        { components: 'remote_select', id: 'applicant', name: '申请人', type: 'applicant' },
        { components: 'remote_select', id: 'agent', name: '代理人', type: 'agent' },
        { components: 'remote_select', id: 'agency', name: '代理机构', type: 'agency' },
        { components: 'static_select', id: 'product', name: '产品分类', type: 'product' },
        { components: 'static_select', id: 'tag', name: '标签', type: 'tag' },
        { components: 'date',          id: 'apd', name: '申请日' },
        { components: 'date',          id: 'issue_date', name: '公告日' },
    ]],
    ['fee', [
        { components: 'remote_select', id: 'target', name: '费用对象', type: 'member'  , used: true},
        { components: 'static_select', id: 'code', name: '费用类型', type: 'fee_code' },
        { components: 'date',          id: 'mail_date', name: '通知书发文日' },
        { components: 'date',          id: 'create_time', name: '费用生成日期' },
        { components: 'date',          id: 'due_time', name: '账单期限' },
        { components: 'date',          id: 'deadline', name: '官方绝限' },
        { components: 'date',          id: 'pay_time', name: '发放时间', path: 'bonus', used: true },        
        { components: 'date',          id: 'pay_time', name: '付款时间', path: 'oa', used: true},        
        { components: 'date',          id: 'pay_time', name: '到账时间', path: 'subsidy', used: true },
        { components: 'static_select', id: 'category', name: '案件类型', type: 'case_type' },
        { components: 'static_select', id: 'patent_type', name: '专利类型', type: 'patent_type' },
        { components: 'date',          id: 'apd', name: '申请日' },
        { components: 'static_select', id: 'area', name: '地区', type: 'area' },
    ]],
    ['invoice', [
        { components: 'static_select', id: 'status', name: '账单状态', type: 'invoice_type' },
        { components: 'remote_select', id: 'target', name: '账单对象', type: 'member'  , used: true},
        { components: 'date',          id: 'create_time', name: '账单生成日期' },
        { components: 'date',          id: 'due_time', name: '费用期限' },
        { components: 'date',          id: 'pay_time', name: '付款时间' },
    ]],
    ['patent_notice',[
        { components: 'static_select', id: 'file_type_id', name: '通知书名称', type: 'file_type_patent_notice'  , used: true},
        { components: 'remote_select', id: 'uploader', name: '上传用户', type: 'member' },
        { components: 'date',          id: 'create_time', name: '上传日', },
        { components: 'date',          id: 'apd', name: '申请日', },
        { components: 'date',          id: 'deadline', name: '官方绝限', },
        { components: 'date',          id: 'mail_date', name: '发文日', },
    ]],
    ['certificate',[
        { components: 'input',         id: 'certificate_no',                name: '证书编号',},        
        { components: 'input',         id: 'remark',                        name: '备注', },
        { components: 'remote_select', id: 'applicants',                    name: '申请人', type: 'applicant', used: true},
        { components: 'input',         id: 'apn',                           name: '申请号'},
        { components: 'date',          id: 'apd',                           name: '申请日', used: true},
        { components: 'remote_select', id: 'inventors',                     name: '发明人', type: 'inventor'},    
        { components: 'remote_select', id: 'agent',                         name: '代理人', type: 'agent' },
        { components: 'remote_select', id: 'agency',                        name: '代理机构', type: 'agency' },
        { components: 'static_select', id: 'is_district_funding',           name: '是否已申报资助', type: 'bool', multiple: false},    
        { components: 'static_select', id: 'is_city_funding',               name: '是否已申报市资助', type: 'bool', multiple: false},    
    ]],
    /* 申请人 */
    ['applicants',[
        { components: 'remote_select', id: 'customer',               name: '客户', type: 'customer', used: true},
        { components: 'input',         id: 'name',                   name: '申请人姓名', used: true},
        { components: 'static_select', id: 'citizenship',            name: '国籍', type: 'area'},
        { components: 'static_select', id: 'applicant_type',         name: '申请人类型', type: 'applicant_type', used: true},
        { components: 'input',         id: 'identity',               name: '证件号码'},
        { components: 'input',         id: 'postcode',               name: '邮编'},
        { components: 'input',         id: 'email_address',          name: '邮箱'},
        { components: 'input',         id: 'phone_number',           name: '电话号码'},
        { components: 'input',         id: 'residence',              name: '住所所在地', type: 'area'},
        { components: 'input',         id: 'address',                name: '详细地址', type: 'area'},
        { components: 'static_select', id: 'is_fee_discount',        name: '费用备案', type: 'fee_discount'},
        { components: 'input',         id: 'english_name',           name: '英文姓名'},
        { components: 'input',         id: 'english_address',        name: '英文地址'},
    ]],
    /* 发明人 */
    ['inventors',[
        { components: 'remote_select', id: 'customer',               name: '客户', type: 'customer', used: true},
        { components: 'input',         id: 'name',                   name: '姓名'},
        { components: 'input',         id: 'title',                  name: '尊称'},
        { components: 'static_select', id: 'citizenship',            name: '国籍', type: 'area'},
        { components: 'input',         id: 'email_address',          name: '邮箱'},
        { components: 'input',         id: 'phone_number',           name: '电话号码'},
        { components: 'input',         id: 'identity',               name: '证件号码'},
        { components: 'input',         id: 'first_name',             name: '英文名'},
        { components: 'input',         id: 'last_name',              name: '英文姓'},
        { components: 'input',         id: 'remark',                 name: '备注'},
    ]],
    /* 联系人 */
    ['contacts',[
        { components: 'remote_select', id: 'customer',               name: '客户', type: 'customer', used: true},
        { components: 'remote_select', id: 'name',                   name: '姓名'},
        { components: 'static_select', id: 'contact_type',           name: '类型', type: 'contacts_type', used: true},
        { components: 'input',         id: 'email_address',          name: '邮箱'},
        { components: 'input',         id: 'address',                name: '电话号码'},
        { components: 'input',         id: 'phone_number',           name: '地址'},
        { components: 'input',         id: 'remark',                 name: '备注'},
    ]],
    /* 客户备注 */
    ['remarks',[
        { components: 'remote_select', id: 'customer',               name: '客户', type: 'customer', used: true},
        { components: 'static_select', id: 'type',                   name: '类型', type: 'remark_type', used: true},
        { components: 'date',          id: 'creation_time',          name: '备注时间'},
        { components: 'input',         id: 'content',                name: '备注内容'},

    ]],
    /* 合同管理 */
    ['contracts',[
        { components: 'remote_select', id: 'customer',               name: '客户', type: 'customer', used: true},
        { components: 'remote_select', id: 'name',                   name: '联系人', type: 'contacts', used: true},
        { components: 'input',         id: 'serial',                 name: '合同编号'},
        { components: 'static_select', id: 'type',                   name: '合同类型',type:"contract_type",used:true},
        { components: 'date',          id: 'signing_date',           name: '签订日期'},
        { components: 'date',          id: 'expire_date',            name: '届满日期'},
        { components: 'input',         id: 'remark',                 name: '备注'},
    ]],
    /* 开票信息 */
    ['invoice_targets',[
        { components: 'remote_select', id: 'customer',               name: '客户', type: 'customer', used: true},
        { components: 'static_select', id: 'target_type',            name: '主体类型', type: 'target_type', used: true},
        { components: 'input',         id: 'name',                   name: '单位名称'},
        { components: 'input',         id: 'identity',               name: '纳税人识别号'},
        { components: 'input',         id: 'address',                name: '注册地址'},
        { components: 'input',         id: 'phone_number',           name: '联系电话'},
        { components: 'input',         id: 'bank',                   name: '开户行'},
        { components: 'input',         id: 'account',                name: '银行账户'},
        { components: 'input',         id: 'remark',                 name: '备注'},
    ]],
    /* 请款管理 */
    ['invoices',[
        { components: 'remote_select', id: 'user',                   name: '请款对象', type: 'user', used: true},
        { components: 'date',          id: 'request_time',           name: '请款时间'},
        { components: 'date',          id: 'deadline',               name: '回款期限'},
        { components: 'date',          id: 'payment_time',           name: '回款时间'},
        { components: 'static_select', id: 'status',                 name: '请款单状态',type:"invoice_status"},
    ]],
    /* 回款管理 */
    ['received_payments',[
        { components: 'remote_select', id: 'customer',                name: '客户', type: 'customer', used: true},
    ]],
    /* 发票管理 */
    ['invoice_request',[
        { components: 'remote_select', id: 'customer',                name: '客户', type: 'customer', used: true},
    ]],
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
    ['patent_notice', '/news/patent_notice'],
    ['certificate', '/patent/certificate']
])

export {map, customPathMap, listPathMap};