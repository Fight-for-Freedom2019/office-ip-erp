/*selelct静态选项配置*/
const config = [
  [
    "numbers_of_documents",
    {
      placeholder: "请选择文档种类",
      options: [
        { name: "一种文档", id: 1 },
        { name: "二种文档", id: 2 },
        { name: "三种文档", id: 3 },
        { name: "四种文档", id: 4 },
        { name: "五种文档", id: 5 },
        { name: "六种文档", id: 6 },
        { name: "七种文档", id: 7 },
        { name: "八种文档", id: 8 },
        { name: "九种文档", id: 9 },
        { name: "十种文档", id: 10 }
      ]
    }
  ],
  [
    "deposition_manner",
    {
      placeholder: "请选择交存方式",
      options: [
        { name: "使用黑色宽斜线覆盖", id: 1 },
        { name: "前10页和任选连续的50页", id: 2 },
        { name: "目前程序的连续前、后各30页和源程序任选连续的20页", id: 3 }
      ]
    }
  ],
  [
    "develop_mode",
    {
      placeholder: "请选择开发模式",
      options: [
        { name: "独立开发", id: 1 },
        { name: "合作开发", id: 2 },
        { name: "委托开发", id: 3 },
        { name: "下达任务开发", id: 4 }
      ]
    }
  ],
  [
    "deposition_material",
    {
      placeholder: "请选择软件鉴别材料",
      options: [{ name: "一般交存", id: 1 }, { name: "例外交存", id: 2 }]
    }
  ],
  [
    "right_scope",
    {
      placeholder: "请选择权利范围",
      options: [{ name: "全部", id: 1 }, { name: "部分", id: 2 }]
    }
  ],
  [
    "right_acquisition_method",
    {
      placeholder: "请选择权利取得方式",
      options: [{ name: "原始取得", id: 1 }, { name: "继受取得", id: 2 }]
    }
  ],
  [
    "original_flag",
    {
      placeholder: "请选择原创类型",
      options: [{ name: "原创", id: 1 }, { name: "修改", id: 2 }]
    }
  ],
  [
    "file_type_category",
    {
      placeholder: "请选择文件类型",
      options: [
        { name: "官文通知", id: 1 },
        { name: "中间文件", id: 2 },
        { name: "定稿文件", id: 3 }
      ]
    }
  ],
  [
    "project_type",
    {
      placeholder: "请选择案件类型",
      options: [
        { name: "专利", id: "专利" },
        { name: "商标", id: "商标" },
        { name: "版权", id: "版权" }
      ]
    }
  ],
  [
    "subtype",
    {
      placeholder: "请选择案件子类型",
      options: [
        { name: "发明专利", id: 1 },
        { name: "实用新型", id: 2 },
        { name: "外观设计", id: 3 }
      ]
    }
  ],
  [
    "receiverType",
    {
      placeholder: "请选择收件人类型",
      options: [
        { name: "基于身份", id: 1 },
        { name: "固定人员（内部）", id: 2 },
        { name: "固定人员（外部）", id: 3 }
      ]
    }
  ],
  [
    "status",
    {
      placeholder: "请选择状态",
      options: [{ name: "禁用", id: 0 }, { name: "启用", id: 1 }]
    }
  ],
  [
    "text_filter_relate",
    {
      placeholder: "请选择操作符",
      options: [
        { name: "等于", id: 1 },
        { name: "不等于", id: 2 },
        { name: "包含", id: 3 },
        { name: "不包含", id: 4 }
      ]
    }
  ],
  [
    "contract_mode",
    {
      placeholder: "请选择合同类型",
      options: [{ name: "总框架协议", id: 1 }, { name: "单独合同", id: 2 }]
    }
  ],
  [
    "fee_mode",
    {
      placeholder: "请选择费用类型",
      options: [{ name: "后付费", id: 1 }, { name: "预付费", id: 2 }]
    }
  ],

  [
    "date_filter_relate",
    {
      placeholder: "请选择日期筛选",
      options: [
        { name: "等于", id: 1 },
        { name: "之前", id: 2 },
        { name: "之后", id: 3 },
        { name: "介于", id: 4 }
      ]
    }
  ],
  [
    "relative_projects_type",
    {
      placeholder: "请选择案件类型",
      options: [
        // { name: "仅复制", id: 0 },
        { name: "要求优先权", id: 1 },
        { name: "分案申请", id: 2 },
        { name: "部分连续案", id: 3 },
        { name: "同套发明与新型", id: 4 },
        { name: "不同地区同族", id: 5 },
        { name: "要求同日送件", id: 6 }
      ]
    }
  ],
  [
    "role",
    {
      placeholder: "请选择统计类型",
      options: [{ id: 3, name: "IPR统计" }, { id: 6, name: "代理人统计" }]
    }
  ],
  [
    "case_level",
    {
      placeholder: "请选择案件等级",
      options: [
        { id: "", name: "全部" },
        { id: "A", name: "A" },
        { id: "B", name: "B" },
        { id: "C", name: "C" },
        { id: "D", name: "D" }
      ]
    }
  ],

  [
    "cycle",
    {
      placeholder: "请选择数据周期",
      options: [
        { id: "day", name: "每天" },
        { id: "week", name: "每周" },
        { id: "month", name: "每月" }
      ]
    }
  ],
  [
    "report_type",
    {
      placeholder: "请选择报表类型",
      options: [
        { id: "pie", name: "饼图" },
        { id: "bar", name: "柱状图" },
        { id: "line", name: "折线图" },
        { id: "view", name: "数据透视表" }
      ]
    }
  ],
  [
    "categories",
    {
      placeholder: "请选择商标大类",
      options: [
        { id: 1, name: "[1]化学品" },
        { id: 2, name: "[2]颜料、染料和防腐制品" },
        { id: 3, name: "[3]清洁制剂和梳妆用制剂" },
        { id: 4, name: "[4]工业用油和油脂，燃料和照明材料" },
        { id: 5, name: "[5]药品和其他医用或兽医用制剂" },
        { id: 6, name: "[6]未加工的和半加工的普通金属" },
        { id: 7, name: "[7]机器、机床、马达和引擎" },
        { id: 8, name: "[8]各种行业的作为工具使用的手动器具" },
        { id: 9, name: "[9]装置和仪器" },
        { id: 10, name: "[10]医疗仪器、器械及用品" },
        { id: 11, name: "[11]照明通风" },
        { id: 12, name: "[12]运载工具" },
        { id: 13, name: "[13]火器和花炮产品" },
        { id: 14, name: "[14]贵重金属、珠宝" },
        { id: 15, name: "[15]乐器" },
        { id: 16, name: "[16]纸、纸制品和办公用品" },
        { id: 17, name: "[17]电绝缘，隔热或隔音材料" },
        { id: 18, name: "[18]皮革、人造皮革" },
        { id: 19, name: "[19]非金属建筑材料" },
        { id: 20, name: "[20]家具及其部件" },
        { id: 21, name: "[21]家庭和厨房用小型手动器具" },
        { id: 22, name: "[22]缆及帆篷制品" },
        { id: 23, name: "[23]纺织用纱和线" },
        { id: 24, name: "[24]纺织品" },
        { id: 25, name: "[25]服装，鞋，帽" },
        { id: 26, name: "[26]缝纫用品" },
        { id: 27, name: "[27]在已建成的地板和墙壁上的制品" },
        { id: 28, name: "[28]游戏器具和玩具" },
        { id: 29, name: "[29]动物类食品" },
        { id: 30, name: "[30]植物类食品" },
        { id: 31, name: "[31]未经制作的田地产物" },
        { id: 32, name: "[32]不含酒精的饮料及啤酒" },
        { id: 33, name: "[33]含酒精的饮料（啤酒除外）" },
        { id: 34, name: "[34]烟草；烟具；火柴" },
        { id: 35, name: "[35]广告与商业" },
        { id: 36, name: "[36]保险金融" },
        { id: 37, name: "[37]房屋建筑" },
        { id: 38, name: "[38]电信" },
        { id: 39, name: "[39]运输旅行" },
        { id: 40, name: "[40]材料处理" },
        { id: 41, name: "[41]教育培训" },
        { id: 42, name: "[42]复杂领域活动服务" },
        { id: 43, name: "[43]提供食物和饮料的服务" },
        { id: 44, name: "[44]医疗、卫生和美容" },
        { id: 45, name: "[45]法律服务" }
      ]
    }
  ],
  [
    "ipr_para",
    {
      placeholder: "请选择IPR",
      url: "contacts?listRows=10000&contact_type=2",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "project_stage",
    {
      placeholder: "请选择案件阶段",
      url: "/project_stages?listOnly=1",
      handle(data) {
        return data.data;
      }
    }
  ],
  [
    "patent_type",
    {
      placeholder: "请选择专利类型",
      options: [
        { name: "发明专利", id: 1 },
        { name: "实用新型", id: 2 },
        { name: "外观设计", id: 3 },
        { name: "发明+新型", id: 4 },
        { name: "PCT申请", id: 8 }
      ]
    }
  ],
  [
    "trademark_type",
    {
      placeholder: "请选择商标类型",
      options: [
        { name: "文字", id: 1 },
        { name: "图形", id: 2 },
        { name: "文字+图形", id: 3 },
        { name: "立体", id: 4 },
        { name: "声音", id: 5 },
        { name: "气味", id: 6 }
      ]
    }
  ],
  [
    "copyright_type",
    {
      placeholder: "请选择版权类型",
      options: [
        { name: "计算机软件著作权", id: 1 },
        { name: "文字作品著作权", id: 2 },
        { name: "美术作品著作权", id: 3 },
        { name: "影视作品著作权", id: 4 }
      ]
    }
  ],
  [
    "patent_type_strainer",
    {
      placeholder: "请选择专利类型",
      options: [
        { name: "发明专利", id: 1 },
        { name: "实用新型", id: 2 },
        { name: "外观设计", id: 3 }
      ]
    }
  ],

  [
    "table_type",
    {
      placeholder: "请选择模块",
      options: [
        { id: "Patent", name: "专利" },
        // { id: 'Trademark', name: '商标' },
        // { id: 'Copyright', name: '版权' },
        // { id: 'Project', name: '项目' },
        { id: "Process", name: "工作流" },
        { id: "Customer", name: "客户" },
        { id: "Fee", name: "费用" },
        { id: "Invoice", name: "账单" }
      ]
    }
  ],

  [
    "file_type_oa",
    {
      placeholder: "请选择文件类型",
      url: "/file_types?project_type=专利&listRows=10000",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "file_type_voucher",
    {
      placeholder: "请选择文件类型",
      url: "/file_types?project_type=费用&listRows=10000",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "file_type_other",
    {
      placeholder: "请选择文件类型",
      url: "/file_types?project_type=其它&listRows=10000",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "file_type_cpc",
    {
      placeholder: "请选择文件类型",
      url: "/file_types?project_type=专利&listRows=10000",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "file_type",
    {
      placeholder: "请选择文件类型",
      url: "/file_types?project_type=专利&listRows=10000",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "file_type_patent",
    {
      placeholder: "请选择专利文件类型",
      url: "/file_types?project_type=专利&listRows=10000",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "file_type_patent_notice",
    {
      placeholder: "请选择专利通知书文件类型",
      url: "/file_types?project_type=专利&listRows=10000",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "file_type_trademark",
    {
      placeholder: "请选择商标文件类型",
      url: "/file_types?project_type=商标&listRows=10000",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "file_type_trademark_notice",
    {
      placeholder: "请选择商标通知书文件类型",
      url: "/file_types?project_type=商标&listRows=10000"
    }
  ],
  [
    "file_type_copyright",
    {
      placeholder: "请选择版权文件类型",
      url: "/file_types?project_type=版权&listRows=10000"
    }
  ],
  [
    "file_type_copyright_notice",
    {
      placeholder: "请选择版权通知书文件类型",
      url: "/file_types?project_type=版权&listRows=10000"
    }
  ],

  [
    "group",
    {
      placeholder: "请选择用户组",
      options: "groupOptions"
    }
  ],
  [
    "mail",
    {
      placeholder: "请输入邮箱地址",
      url: "/mailAddress",
      handle(data) {
        return data.list.map(_ => {
          return { id: _.value, name: _.label };
        });
      },
      allowCreate: true,
      defaultFirstOption: true
    }
  ],
  // ['file_type', {
  //   placeholder: '请输入邮箱地址',
  //   url: '/file_types?listOnly=1',
  //   handle (data) {
  //     return data.data;
  //   },
  //   allowCreate: true,
  //   defaultFirstOption: true,
  // }],
  [
    "tags",
    {
      placeholder: "请选择标签",
      options: "tagOptions",
      url: "/tags?listOnly=1",
      handle(data) {
        return data.data.data;
      }
    }
  ],

  [
    "abbr",
    {
      placeholder: "请输入或选择部门简称",
      url: "/abbr",
      handle(data) {
        return data.data.map(_ => {
          return { id: _.abbr, name: _.abbr };
        });
      },
      allowCreate: true,
      defaultFirstOption: true
    }
  ],
  [
    "process_definition",
    {
      placeholder: "请输入或选择管理事项",
      url: "/definitions?listOnly=1",
      handle(data) {
        return data.data;
      },
      defaultFirstOption: true
    }
  ],
  [
    "area",
    {
      placeholder: "请选择地区",
      options: "areaData"
    }
  ],
  [
    "patent_services",
    {
      placeholder: "请选择服务类型",
      url: "/services?project_type=专利&listOnly=1",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "trademark_services",
    {
      placeholder: "请选择服务类型",
      url: "/services?project_type=商标&listOnly=1",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "copyright_services",
    {
      placeholder: "请选择服务类型",
      url: "/services?project_type=版权&listOnly=1",
      handle(data) {
        return data.data.data;
      }
    }
  ],

  [
    "fee_code_renewal",
    {
      placeholder: "请选择年费类型",
      url: "/fee_codes?listOnly=1&is_renewal_fee=1",
      handle(data) {
        return data.data;
      }
    }
  ],
  [
    "flows",
    {
      placeholder: "请选择流程",
      options: "flowOptions"
    }
  ],
  [
    "actions",
    {
      placeholder: "请选择流程节点",
      options: "actionOptions"
    }
  ],
  [
    "process_stage",
    {
      placeholder: "请选择管制事项阶段",
      url: "/stages?listOnly=1",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "agency",
    {
      placeholder: "请选择管制事项阶段",
      url: "/agencies?listOnly=1",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "agent",
    {
      placeholder: "请选择管制事项阶段",
      url: "/agents?listOnly=1",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "mail_template",
    {
      placeholder: "请选择邮件模板",
      url: "/message_templates?listOnly=1&template_type=1&template_subtype=1",
      handle(data) {
        return data.data;
      }
    }
  ],
  [
    "form",
    {
      placeholder: "请选择表单",
      url: "/forms?listOnly=1",
      handle(data) {
        return data.data.data;
      }
    }
  ],
  [
    "form_field",
    {
      placeholder: "请选择表单字段",
      url: "/fields?listOnly=1",
      handle(data) {
        return data.data.data;
      }
    }
  ],

  [
    "currency",
    {
      placeholder: "请选择币别",
      options: [
        { name: "人民币[CNY]", id: "CNY" },
        { name: "美元[USD]", id: "USD" },
        { name: "欧元[EUR]", id: "EUR" },
        { name: "日元[JPY]", id: "JPY" },
        { name: "韩元[KRW]", id: "KRW" },
        { name: "港币[HKD]", id: "HKD" },
        { name: "新台币[NTD]", id: "NTD" },
        { name: "英磅[GBP]", id: "GBP" },
        { name: "德国马克[DEM]", id: "DEM" },
        { name: "瑞士法郎[CNY]", id: "CHF" },
        { name: "加拿大元[CAD]", id: "CAD" },
        { name: "澳大利亚元[AUD]", id: "AUD" },
        { name: "新西兰元[NZD]", id: "NZD" }
      ]
    }
  ],
  [
    "branch",
    {
      placeholder: "请选择部门",
      options: "branchOptions"
    }
  ],
  [
    "product",
    {
      placeholder: "请选择产品",
      options: "productOptions"
    }
  ],
  [
    "classification",
    {
      placeholder: "请选择技术",
      options: "classificationOptions"
    }
  ],
  [
    "judge_type",
    {
      placeholder: "请选择评审类型",
      options: [
        { id: 1, name: "提案评审" },
        { id: 2, name: "复审评估" },
        { id: 3, name: "PCT评审" },
        { id: 4, name: "自定义评审" }
      ]
    }
  ],
  [
    "bool",
    {
      placeholder: "",
      options: [{ id: 1, name: "是" }, { id: 0, name: "否" }]
    }
  ],
  [
    "language",
    {
      placeholder: "请选择语言类型",
      options: [
        { name: "中文-Chinese", id: "CN" },
        { name: "英文-English", id: "EN" },
        { name: "法文-Franch", id: "FR" },
        { name: "德文-Germany", id: "GE" },
        { name: "日文-Japanese", id: "JP" },
        { name: "俄文-Russian", id: "RU" },
        { name: "西班牙-Spanish", id: "ES" }
      ]
    }
  ],
  [
    "manner",
    {
      placeholder: "请选择申请方式",
      options: [
        { name: "直接申请", id: 1 },
        { name: "巴黎公约", id: 2 },
        { name: "PCT进入国家阶段", id: 3 },
        { name: "外部转入", id: 4 }
      ]
    }
  ],
  [
    "invoice_type",
    {
      placeholder: "请选择账单状态",
      options: [
        { id: 1, name: "待审核" },
        { id: 2, name: "已审核待付款" },
        { id: 3, name: "已拒绝" },
        { id: 4, name: "已付款待上传凭证" },
        { id: 5, name: "已上传凭证" }
      ]
    }
  ],
  [
    "applicant_type",
    {
      placeholder: "申请人类型",
      options: [
        { id: 3, name: "工矿企业" },
        { id: 5, name: "个人" },
        { id: 1, name: "大专院校" },
        { id: 2, name: "科研单位" },
        { id: 4, name: "事业单位" }
      ]
    }
  ],
  [
    "fee_discount",
    {
      placeholder: "费减备案",
      options: [{ id: 0, name: "未完成" }, { id: 1, name: "已完成" }]
    }
  ],
  [
    "contacts_type",
    {
      placeholder: "联系人类型",
      options: [
        { id: 2, name: "IPR" },
        { id: 3, name: "财务接口人" },
        { id: 4, name: "流程接口人" },
        { id: 5, name: "其它" }
      ]
    }
  ],
  [
    "remark_type",
    {
      placeholder: "客户备注类型",
      options: [
        { id: 1, name: "权利要求" },
        { id: 2, name: "说明书" },
        { id: 3, name: "流程" },
        { id: 4, name: "请款" },
        { id: 5, name: "发文" }
      ]
    }
  ],
  [
    "contract_type",
    {
      placeholder: "合同类型",
      options: [
        { id: 0, name: "未定义合同类型" },
        { id: 1, name: "框架协议" },
        { id: 2, name: "订单协议" }
      ]
    }
  ],
  [
    "target_type",
    {
      placeholder: "主体类型",
      options: [{ id: 1, name: "个人" }, { id: 2, name: "单位" }]
    }
  ],
  [
    "account_type",
    {
      placeholder: "账户类型",
      options: [
        { id: 1, name: "对公" },
        { id: 2, name: "对私" },
        { id: 3, name: "第三方" },
        { id: 4, name: "现金" }
      ]
    }
  ],
  [
    "customer_reminder_type",
    {
      placeholder: "跟催类型",
      options: [
        { id: 1, name: "邮件" },
        { id: 2, name: "电话" },
        { id: 3, name: "IM" }
      ]
    }
  ],
  [
    "invoice_status",
    {
      placeholder: "请款单状态",
      options: [
        { id: 0, name: "待对账" },
        { id: 3, name: "流程主管审核中" },
        { id: 4, name: "流程主管审核不通过" },
        { id: 5, name: "待请款" },
        { id: 6, name: "待客户确认" },
        { id: 7, name: "待寄送票据" },
        { id: 8, name: "待回款" },
        { id: 9, name: "已回款" },
        { id: 10, name: "已删除" },
        { id: 11, name: "待上传票据" },
        { id: 12, name: "待付款" },
        { id: 13, name: "已付款" },
        { id: 14, name: "总经理审核中" },
        { id: 15, name: "总经理审核不通过" },
      ]
    }
  ],
  [
    "invoice_status_fee",
    {
      placeholder: "付款单状态",
      options: [
        { id: 0, name: "待审核" },
        { id: 1, name: "流程主管审核中" },
        { id: 2, name: "根据流程主管意见修改" },
        { id: 3, name: "财务主管审核中" },
        { id: 4, name: "根据财务主管意见修改" },
        { id: 14, name: "总经理审核中" },
        { id: 11, name: "待上传票据" },
        { id: 12, name: "待付款" },
        { id: 13, name: "已付款" },
        { id: 10, name: "已删除" }
      ]
    }
  ],
  [
    "fee_code",
    {
      placeholder: "请选择费用名称",
      url: "/feecode",
      handle(data) {
        return data.data;
      }
    }
  ],
  [
    "fee_type",
    {
      placeholder: "请选择费用类型",
      options: [
        { id: 1, name: "代理费" },
        { id: 2, name: "官费" },
        { id: 3, name: "撰稿费" },
        { id: 4, name: "销售提成" },
        { id: 5, name: "供应商服务费" }
      ]
    }
  ],
  [
    "fee_status",
    {
      placeholder: "请选择费用状态",
      options: [
        { id: 0, name: "初始录入" },
        { id: 1, name: "待请款" },
        { id: 2, name: "已请款" },
        { id: 5, name: "已回款" },
        { id: 11, name: "待付款" },
        { id: 12, name: "付款计划" },
        { id: 15, name: "已付款" },
        { id: 16, name: "已删除" }
      ]
    }
  ],
  [
    "policy",
    {
      placeholder: "请选择费用策略",
      options: [
        { id: 1, name: "代缴代垫" },
        { id: 2, name: "代缴不代垫" },
        { id: 3, name: "仅监控" }
      ]
    }
  ]
];

export default config;
