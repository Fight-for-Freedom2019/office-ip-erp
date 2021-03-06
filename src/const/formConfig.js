// 工作流动态表格配置项
const map = new Map([
  [
    "single_user_select",
    {
      components: "remote_select",
      type: "user",
      rules: {
        type: "number",
        required: true,
        message: "代理人不能为空",
        trigger: "change"
      }
    }
  ],
  [
    "input",
    {
      components: "input",
      type: "text"
    }
  ],
  [
    "switch",
    {
      components: "switch",
      type: "is",
    }
  ],
  [
    "date",
    {
      components: "date",
      type: "date"
    }
  ],
  [
    "review_posting_date",
    {
      components: "date",
      type: "date",
      if: "this.form.is_add_comments == 1"
    }
  ],
  [
    "multiple_attachments",
    {
      components: "upload",
      rules: {
        type: "array",
        required: true,
        message: "附件必须上传",
        trigger: "change"
      }
    }
  ],
  [
    "order_detail",
    {
      components: "panel",
      type: "order"
    }
  ],
  [
    "contract_detail",
    {
      components: "panel",
      type: "contract"
    }
  ],
  [
    "payment_request_detail",
    {
      components: "panel",
      type: "payment_request"
    }
  ],
  [
    "outgo_payment_detail",
    {
      components: "panel",
      type: "outgo_payment"
    }
  ],
  [
    "voucher_detail",
    {
      components: "panel",
      type: "voucher"
    }
  ],
  [
    "sensitive_operation_detail",
    {
      components: "panel",
      type: "sensitive_operation"
    }
  ],
  [
    "cpc_editor",
    {
      components: "panel",
      type: "cpc_editor"
    }
  ],
  [
    "process_assign",
    {
      components: "panel",
      type: "process_assign"
    }
  ],
  [
    "patent_add",
    {
      components: "panel",
      type: "patent_add"
    }
  ],
  [
    "trademark_add",
    {
      components: "panel",
      type: "trademark_add"
    }
  ],
  [
    "copyright_add",
    {
      components: "panel",
      type: "copyright_add"
    }
  ],
  [
    "patent",
    {
      components: "panel",
      type: "patent"
    }
  ],
  [
    "trademark",
    {
      components: "panel",
      type: "trademark"
    }
  ],
  [
    "copyright",
    {
      components: "panel",
      type: "copyright"
    }
  ],
  [
    "postpone",
    {
      components: "panel",
      type: "postpone"
    }
  ],
  [
    "bonus_report",
    {
      components: "panel",
      type: "bonus_report"
    }
  ],
  [
    "assign_type",
    {
      components: "static_select",
      type: "assign_type",
      // if: "this.opinion == 'pass'",
      default: 1
    }
  ],
  [
    "assigner",
    {
      components: "remote_select",
      type: "user",
      rules: {
        type: "number",
        required: true,
        message: "派案人不能为空",
        trigger: "change"
      }
      // if: "this.opinion == 'pass' && this.form.assign_type === 2"
    }
  ],
  [
    "pic",
    {
      components: "jump_select",
      type: "user",
      multiple: false,
      rules: {
        type: "number",
        required: true,
        message: "承办人不能为空",
        trigger: "change"
      }
      // if: "this.opinion == 'pass' && this.form.assign_type === 1"
    }
  ],
  [
    "process_tags",
    {
      components: "jump_select",
      type: "tags",
      multiple: true
      // if: "this.opinion == 'pass' && this.form.assign_type === 1"
    }
  ],
  [
    "patent_mail",
    {
      components: "remote_select",
      type: "user",
      if: "false"
    }
  ],
  [
    "is",
    {
      components: "static_select",
      type: "is",
    }
  ],
  [
    "points",
    {
      components: "points",
      type: "number",
      rules: {
        type: "number",
        required: true,
        message: "点数不能为空",
        trigger: "change"
      },
      // if: "this.opinion == 'pass' && this.form.assign_type === 1",
      vkey: "points"
    }
  ],
  ["app_radio",{
    components: "app_radio",
  }]
]);
export { map };
