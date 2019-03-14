// 名片配置项
const config = [
  [
    "applicant",
    {
      URL: "/applicants",
      DATA_KEY: "data",
      ARRAY: false,
      PARAMS: {},
      FIELDS: [
        { label: "名称", key: "name" },
        {
          label: "类型",
          key: "type",
          render: (h, item) => {
            const val = item.name;
            return h("span", val);
          }
        },
        { label: "证件号码", key: "identity" },
        {
          label: "地址",
          key: "full_address",
          render: (h, item) => {
            return h("span", item);
          }
        },
        {
          label: "费减备案",
          key: "is_fee_discount",
          render: (h, item) => {
            const val = item == 1 ? "是" : "否";
            return h("span", val);
          }
        }
      ]
    }
  ],
  [
    "inventor",
    {
      URL: "/inventors",
      DATA_KEY: "data",
      ARRAY: false,
      PARAMS: {},
      FIELDS: [
        { label: "姓名", key: "name" },
        { label: "国籍", key: "citizenship" },
        { label: "证件号码", key: "identity" },
        { label: "电话", key: "phone_number" },
        { label: "邮箱", key: "email_address" }
      ]
    }
  ],
  [
    "customer",
    {
      URL: "/customers",
      DATA_KEY: "data",
      PARAMS: {},
      FIELDS: [
        { label: "名称", key: "name" },
        {
          label: "联系人",
          key: "contact",
          render: (h, item) => {
            const val = item && item != undefined ? item.name : "";
            return h("span", val);
          }
        },
        { label: "电话", key: "phone_number" },
        { label: "邮箱", key: "email_address" },
        {
          label: "地址",
          key: "full_address",
          render: (h, item) => {
            return h("span", item);
          }
        }
      ]
    }
  ],
  [
    "contact",
    {
      URL: "/contacts",
      DATA_KEY: "data",
      ARRAY: false,
      PARAMS: {},
      FIELDS: [
        { label: "名称", key: "name" },
        { label: "电话", key: "phone_number" },
        { label: "邮箱", key: "email_address" }
      ]
    }
  ],
  [
    "ipr_para",
    {
      URL: "/contacts",
      DATA_KEY: "Contact",
      ARRAY: false,
      PARAMS: {},
      FIELDS: [
        { label: "名称", key: "name" },
        { label: "电话", key: "phone_number" },
        { label: "邮箱", key: "email_address" }
      ]
    }
  ],
  [
    "agent",
    {
      URL: "/agent",
      DATA_KEY: "agent",
      ARRAY: false,
      PARAMS: {},
      FIELDS: [
        { label: "擅长领域", key: "major" },
        { label: "工作年限", key: "working_experience" },
        { label: "简介", key: "introduction" },
        { label: "状态", key: "status_name" },
        { label: "电话", key: "phone_number" },
        { label: "邮箱", key: "email_address" }
      ]
    }
  ],
  [
    "invoice_target",
    {
      URL: "/invoice_targets",
      DATA_KEY: "data",
      ARRAY: false,
      PARAMS: {},
      FIELDS: [
        { label: "抬头", key: "name" },
        { label: "纳税人识别号", key: "identity" },
        { label: "开户行", key: "bank" },
        { label: "银行账号", key: "account" },
        { label: "地址", key: "address" },
        { label: "电话", key: "phone_number" }
      ]
    }
  ],
];
export default config;
